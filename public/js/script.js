(() => {
  'use strict';

  // Bootstrap form validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      },
      false
    );
  });

  // Tax toggle on listings index
  const taxSwitch = document.getElementById('switchCheckDefault');
  if (taxSwitch) {
    taxSwitch.addEventListener('change', () => {
      document.querySelectorAll('.tax-info').forEach((el) => {
        el.style.display = taxSwitch.checked ? 'inline' : 'none';
      });
    });
  }
})();
