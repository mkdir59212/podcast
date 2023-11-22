// Récupérez le contenu HTML de la page
var htmlContent = document.documentElement.outerHTML;

// Utilisez le reste du code pour extraire les détails et générer le flux RSS
var parser = new DOMParser();
var doc = parser.parseFromString(htmlContent, 'text/html');

// Sélectionnez tous les éléments audio sur la page
var audioElements = doc.querySelectorAll('.style-player-new');

// Générez le fichier RSS
var rssContent = `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Votre Flux Audio</title>
    <link>URL_de_votre_site_web</link>
    <description>Description de votre flux audio</description>
    <language>fr-FR</language>
    
    ${Array.from(audioElements).map((audioElement) => {
      var title = audioElement.querySelector('.info h1').innerText;
      var description = audioElement.querySelector('.info h2').innerText;
      var date = audioElement.querySelector('.info h4').innerText;
      var audioUrl = audioElement.querySelector('.audio source').getAttribute('src');

      // Ici, vous pouvez ajouter du code pour extraire l'URL de l'épisode à partir du HTML
      // Par exemple, si l'URL est dans un attribut data-episode-url, vous pouvez faire quelque chose comme :
      var episodeUrl = audioElement.getAttribute('data-episode-url');

      // Générer un élément pour chaque contenu audio
      return `
        <item>
          <title>${title}</title>
          <link>${episodeUrl}</link>
          <description>${description}</description>
          <enclosure url="${audioUrl}" length="Taille_en_octets" type="audio/mpeg" />
          <pubDate>${date}</pubDate>
        </item>
      `;
    }).join('')}
  </channel>
</rss>
`;

console.log(rssContent);
