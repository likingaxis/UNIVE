# 🌸 Appunti Universitari (UNIVE)

Appunti e note universitarie di Informatica - Università degli Studi di Roma "Tor Vergata", pubblicati tramite **[Flowershow](https://flowershow.app/)**.

---

## 🚀 Come Pubblicare il Sito

Puoi gestire e aggiornare il tuo sito web in due modi:

### Metodo 1: Plugin Ufficiale Obsidian (Consigliato ⭐)
1. Apri **Obsidian** $\rightarrow$ **Settings** $\rightarrow$ **Community Plugins**.
2. Cerca e installa il plugin **"Flowershow"** e attivalo.
3. Vai su [cloud.flowershow.app](https://cloud.flowershow.app), crea il tuo account gratuito e genera un **Personal Access Token (PAT)** nelle impostazioni.
4. Incolla il token nelle impostazioni del plugin Flowershow su Obsidian.
5. Clicca sull'icona di Flowershow nella barra laterale di Obsidian (o premi `Ctrl+P` $\rightarrow$ *Publish to Flowershow*) per pubblicare/sincronizzare il tuo vault in 1 click!

---

### Metodo 2: Tramite Riga di Comando (CLI)

Se preferisci usare il terminale:

1. **Login (solo la prima volta):**
   ```bash
   npm run login
   ```
2. **Pubblicazione iniziale:**
   ```bash
   npm run publish
   ```
3. **Sincronizzazione modifiche successive:**
   ```bash
   npm run sync
   ```

---

## ⚙️ Personalizzazione (`config.json`)

Le impostazioni del sito (titolo, descrizione, tema, menu di navigazione) sono configurabili nel file [`content/config.json`](./content/config.json):

```json
{
  "title": "Appunti Universitari | Luca Gugliotta",
  "description": "Appunti e note universitarie di Informatica",
  "theme": "letterpress",
  "showEditLink": false,
  "author": "Luca Gugliotta"
}
```
