// === Photo Click Animation ===
document.addEventListener('DOMContentLoaded', function() {
  const photoImg = document.querySelector('img[src$="photo-William.jpg"]');
  
  if (photoImg) {
    // Rendre la photo clickable
    photoImg.style.cursor = 'pointer';
    photoImg.setAttribute('tabindex', '0');
    
    // Fonction pour déclencher l'animation
    function triggerClickAnimation() {
      // Retirer la classe si elle existe déjà
      photoImg.classList.remove('clicked');
      
      // Forcer un reflow pour que l'animation se retrigger
      void photoImg.offsetWidth;
      
      // Ajouter la classe pour déclencher l'animation
      photoImg.classList.add('clicked');
      
      // Retirer la classe après l'animation
      setTimeout(() => {
        photoImg.classList.remove('clicked');
      }, 600);
    }
    
    // Événement clic souris
    photoImg.addEventListener('click', triggerClickAnimation);
    
    // Événement pour la touche Entrée (accessibilité)
    photoImg.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerClickAnimation();
      }
    });
  }

  // === Download CV Button ===
  // Créer le bouton de téléchargement
  const downloadBtn = document.createElement('button');
  downloadBtn.id = 'download-cv-btn';
  downloadBtn.innerHTML = '📥 Télécharger CV';
  downloadBtn.className = 'download-cv-btn';
  
  // Insérer le bouton après le header
  const header = document.querySelector('.header');
  header.parentNode.insertBefore(downloadBtn, header.nextSibling);
  
  // Ajouter l'événement de clic
  downloadBtn.addEventListener('click', function() {
    downloadCVAsPDF();
  });
  
  // Fonction pour télécharger en PDF
  function downloadCVAsPDF() {
    const container = document.querySelector('.container');
    const opt = {
      margin: 10,
      filename: 'CV-William.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Vérifier si html2pdf est disponible
    if (typeof html2pdf !== 'undefined') {
      html2pdf().set(opt).from(container).save();
    } else {
      // Fallback : télécharger en HTML si html2pdf n'est pas chargé
      const htmlContent = document.documentElement.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV-William.html';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }
});
