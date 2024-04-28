const hiddenClassName = "--hidden";
// -- Navigation
const $btnTestimonial = document.getElementById('BtnTestimonial');
const $btnPass = document.getElementById('BtnPass');
const $btnBack = document.getElementById('BtnBack');
const $optionsContainer = document.querySelector('.c-options');
const $optionSelectedContainer = document.querySelector('.c-option-selected');
const $outputContainers = document.querySelectorAll('.--output-container');

// -- Testimonial Export
const $testimonialContainer = document.querySelector('.c-testimonial-container');
const $testimonialPreview = $testimonialContainer.querySelector('.preview');
const $testimonialOutput = $testimonialContainer.querySelector('.output');
const $btnTestimonialExport = document.getElementById("BtnTestimonialExport");
const $testimonialExport = document.getElementById("TestimonialExport");

// -- Pass Image Export
const templateFrameHtml = document.getElementById('TemplateFrame').innerHTML;
const $passImageInput = document.querySelector('input[name="pass-image"]');
const $passContainer = document.querySelector('.c-pass-container');
const $ExportContainerPass = document.getElementById('ExportContainerInstagram');
const $btnExportPass = document.getElementById('BtnPassImageExport');
let passImages = [];

/** Initial Setup */
document.addEventListener('DOMContentLoaded', function() {
    $passContainer.querySelectorAll('.image').forEach(function(image) {
        image.insertAdjacentHTML('afterend', templateFrameHtml);
    });
    passImages = $passContainer.querySelectorAll('.image');
});

/** Toggle main nav and containers */
$btnPass.addEventListener('click', function() {
    $optionsContainer.classList.add(hiddenClassName);
    $optionSelectedContainer.classList.remove(hiddenClassName);
    $passContainer.classList.remove(hiddenClassName);
});
$btnTestimonial.addEventListener('click', function() {
    $optionsContainer.classList.add(hiddenClassName);
    $optionSelectedContainer.classList.remove(hiddenClassName);
    $testimonialContainer.classList.remove(hiddenClassName);
});
$btnBack.addEventListener('click', function() {
    $optionsContainer.classList.remove(hiddenClassName);
    $optionSelectedContainer.classList.add(hiddenClassName);
    $passContainer.classList.add(hiddenClassName);
    $testimonialContainer.classList.add(hiddenClassName);
});

/** Testimonial Export*/
$btnTestimonialExport.addEventListener('click', function() {
    $testimonialOutput.innerHTML = $testimonialPreview.innerHTML;
    domtoimage.toPng($testimonialExport, {
        height: 1080,
        width: 1080,
    })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = `woodthorpe-adt-testimonial-${Math.floor(Date.now() / 1000)}.png`;
        link.href = dataUrl;
        link.click();
    });
});


/** Pass image - Handle file upload */
$passImageInput.addEventListener('change', function() {
    const file = $passImageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function() {
        passImages.forEach(function(image) {
            image.src = reader.result;
        });

    });

    if (file) {
        reader.readAsDataURL(file);
    }
});

/** Pass image - Zoom in & zoom out */
function zoomIn($element) {
    zoom($element, 'in');
}
function zoomOut($element) {
    zoom($element, 'out');
}
function zoom($element, direction) {
    const currentScale = parseFloat(getComputedStyle($element).getPropertyValue('transform').split(',')[3]);
    const newScale = direction === 'in' ? currentScale + 0.05 : currentScale - 0.05;
    $element.style.transform = `scale(${newScale})`;
}
document.getElementById('BtnZoomIn').addEventListener('click', function() {
    passImages.forEach(function(image) {
        zoomIn(image);
    });
});
document.getElementById('BtnZoomOut').addEventListener('click', function() {
    passImages.forEach(function(image) {
        zoomOut(image);
    });
});

/** Export Pass image */
$btnExportPass.addEventListener('click', function() {
    domtoimage.toJpeg($ExportContainerPass, {
        quality: 0.95,
        height: 1080,
        width: 1080,
    })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = `woodthorpe-adt-pass-${Math.floor(Date.now() / 1000)}.jpeg`;
        link.href = dataUrl;
        link.click();
    });
});