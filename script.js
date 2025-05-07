// --- وظيفة فلترة المحاضرات بناءً على البحث ---
function filterLectures() {
    // الحصول على قيمة البحث وتحويلها لأحرف صغيرة للمقارنة
    let filterValue = document.getElementById('searchInput').value.toLowerCase();

    // الحصول على جميع عناصر قوائم المحاضرات (العناصر التي تحمل الكلاس lecture-list)
    let lectureLists = document.querySelectorAll('.lecture-list');

    // المرور على كل قائمة
    lectureLists.forEach(list => {
        // الحصول على جميع عناصر القائمة (li) داخل القائمة الحالية
        let items = list.getElementsByTagName('li');

        // المرور على كل عنصر في القائمة
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            // الحصول على نص العنصر بالكامل (يتضمن نص الروابط أو النص العادي)
            let textContent = item.textContent || item.innerText;

            // التحقق إذا كان نص العنصر يحتوي على قيمة البحث (مع تجاهل حالة الأحرف)
            if (textContent.toLowerCase().indexOf(filterValue) > -1) {
                item.style.display = ""; // إظهار العنصر إذا تطابق
            } else {
                item.style.display = "none"; // إخفاء العنصر إذا لم يتطابق
            }
        }
    });
    // تعليق: يمكن إضافة رسالة "لا توجد نتائج" إذا كانت جميع العناصر مخفية في جميع القوائم المرئية بعد الفلترة.
}

// --- وظيفة لطي/فتح الأقسام ---
function toggleSection(contentId) {
    let contentElement = document.getElementById(contentId); // الحصول على عنصر المحتوى (<ul>)

    // التحقق مما إذا كان العنصر وُجد قبل محاولة الوصول لخصائصه
    if (contentElement) {
        let toggleIcon = contentElement.previousElementSibling.querySelector('.toggle-icon'); // الحصول على أيقونة السهم في العنوان (h2)

        contentElement.classList.toggle('hidden'); // تبديل كلاس الإخفاء/الإظهار المحدد في CSS

        // تبديل كلاس 'collapsed' على العنصر h2 لتغيير شكل السهم
        contentElement.previousElementSibling.classList.toggle('collapsed');

        // تعليق: يمكن حفظ حالة الفتح/الطي في localStorage لتذكرها بين الزيارات
        // مثال:
        // if (contentElement.classList.contains('hidden')) {
        //     localStorage.setItem(contentId + '_state', 'collapsed');
        // } else {
        //     localStorage.setItem(contentId + '_state', 'expanded');
        // }
    } else {
        console.error("لم يتم العثور على عنصر المحتوى بالمعرف:", contentId);
    }
}

// --- وظيفة لتحديث تاريخ "آخر تحديث" وتعيين السنة الحالية ---
function updateFooterInfo() {
    // تحديث السنة الحالية في التذييل
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.warn("لم يتم العثور على عنصر السنة الحالية.");
    }

    // تعيين تاريخ آخر تحديث (يمكن تحديث هذا التاريخ يدوياً عند تغيير المحتوى)
    const lastUpdatedElement = document.getElementById('lastUpdated');
    const lastUpdateDate = "7 مايو 2025"; // <-- قم بتغيير هذا التاريخ يدوياً عند التحديث
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = lastUpdateDate;
    } else {
        console.warn("لم يتم العثور على عنصر تاريخ آخر تحديث.");
    }
    // تعليق: يمكن جعل تاريخ آخر تحديث ديناميكيًا أكثر إذا كانت الصفحة تُنشأ بواسطة نظام بناء (Build System)
}

// --- وظيفة لتبديل الوضع الليلي ---
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // حفظ التفضيل في التخزين المحلي (localStorage)
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

     // تبديل أيقونة الزر بين الشمس والقمر
    const toggleButton = document.getElementById('darkModeToggle');
    if (body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // أيقونة الشمس للوضع النهاري
        toggleButton.setAttribute('aria-label', 'تبديل الوضع النهاري');
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // أيقونة القمر للوضع الليلي
        toggleButton.setAttribute('aria-label', 'تبديل الوضع الليلي');
    }
}

// --- تطبيق الوضع المحفوظ عند تحميل الصفحة ---
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const toggleButton = document.getElementById('darkModeToggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        // تحديث الأيقونة عند تحميل الصفحة إذا كان الوضع داكنًا
         if (toggleButton) {
            toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            toggleButton.setAttribute('aria-label', 'تبديل الوضع النهاري');
         }
    } else {
         // التأكد من عرض أيقونة القمر إذا لم يكن هناك تفضيل أو كان التفضيل نهاريًا
         // (هذا هو الوضع الافتراضي، لكن نضمن تحديث الزر إذا كان موجوداً)
         if (toggleButton) {
             toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
             toggleButton.setAttribute('aria-label', 'تبديل الوضع الليلي');
         }
    }
}


// --- استدعاء الوظائف عند تحميل الصفحة بالكامل ---
document.addEventListener('DOMContentLoaded', function() {
    console.log("بدء تشغيل سكربتات الصفحة.");

    // تطبيق الوضع المحفوظ (داكن أو نهاري)
    applySavedTheme();

    // تحديث معلومات التذييل عند التحميل
    updateFooterInfo();

    // إضافة مستمع حدث لزر تبديل الوضع الليلي
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    } else {
        console.warn("لم يتم العثور على زر تبديل الوضع الليلي.");
    }


    // تعليق: يمكن إضافة وظائف أخرى ليتم استدعاؤها عند تحميل الصفحة هنا
    // مثال: استعادة حالة الأقسام المفتوحة/المغلقة من localStorage
    // restoreSectionStates(); // يتطلب إضافة الأقسام إلى الدالة if needed

    // تعليق: إذا أردت أن تكون الأقسام مطوية بشكل افتراضي عند تحميل الصفحة، أزل التعليق عن الأسطر التالية:
    // document.getElementById('written-content').classList.add('hidden');
    // document.querySelector('#written-lectures-section h2').classList.add('collapsed');
    // document.getElementById('audio-content').classList.add('hidden');
    // document.querySelector('#audio-lectures-section h2').classList.add('collapsed');


    console.log("تم تحميل الصفحة والسكربتات جاهزة.");
});


// --- وظائف إضافية محتملة (أمثلة مع تعليقات) ---
// function restoreSectionStates() {
//     // أضف IDs أقسام أخرى هنا لتحفظ حالتها
//     const sections = ['written-content', 'audio-content']; // لم يعد قسم الفيديو موجوداً
//
//     sections.forEach(id => {
//         const state = localStorage.getItem(id + '_state');
//         if (state === 'collapsed') {
//             const contentElement = document.getElementById(id);
//             if(contentElement){
//                 contentElement.classList.add('hidden');
//                 // ابحث عن العنصر h2 الذي يسبق عنصر المحتوى مباشرة لإضافة كلاس 'collapsed' له أيضاً
//                 const h2Element = contentElement.previousElementSibling;
//                 if(h2Element && h2Element.tagName === 'H2') {
//                      h2Element.classList.add('collapsed');
//                 }
//             }
//         }
//     });
//     console.log("تم استعادة حالة الأقسام المحفوظة.");
// }

// function setupAnalytics() {
//     // كود لإعداد تحليلات جوجل أو أي خدمة أخرى
//     console.log("تم إعداد التحليلات (مثال).");
// }

// function setupSmoothScrolling() {
//     // كود لجعل التنقل داخل الصفحة سلسًا عند النقر على روابط داخلية
//     // يتطلب مكتبة جافاسكربت أو كود مخصص
//     console.log("تم إعداد التمرير السلس (مثال).");
// }

// --- تعليقات نهائية لتوثيق السكربت ---
// تم الانتهاء من السكربتات الأساسية للصفحة.
// يمكن إضافة المزيد من الوظائف المعقدة هنا.
// مثل التحميل الكسول (Lazy Loading) للمحتوى إذا كانت القوائم طويلة جداً.
// أو التفاعل مع واجهات برمجية خارجية (APIs) لجلب المحتوى ديناميكياً.
// تأكد من اختبار الكود على متصفحات وأجهزة مختلفة لضمان التوافق والاستجابة.
// نهاية ملف JavaScript.
// --------------------------------------------
