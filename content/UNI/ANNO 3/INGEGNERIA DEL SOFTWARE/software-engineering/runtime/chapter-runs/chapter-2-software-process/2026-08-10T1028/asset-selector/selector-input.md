# Asset Selector Prompt

## Ruolo
Sei l'**Asset Selector** del sistema di generazione appunti didattici.
Il tuo compito è valutare una lista di immagini candidate (fornite come allegati e come metadati nel Topic Context) per decidere se possiedono un reale valore pedagogico o se sono puramente decorative.

Non devi scrivere gli appunti, ma solo produrre un file YAML con le tue decisioni per ogni asset.

## Obiettivo
Per ogni immagine fornita, devi stabilire se deve essere inclusa nella dispensa finale.
L'obiettivo è mantenere le figure che **comunicano informazioni utili**, **chiariscono concetti complessi**, **mostrano diagrammi importanti (es. UML, BPMN)** o **forniscono esempi visuali concreti**.
Devi invece scartare immagini di repertorio, foto puramente estetiche, titoli di slide resi come testo-immagine, icone non semantiche o sfondi.

## Input Ricevuto
Riceverai un contesto strutturato che contiene:
- L'elenco dei `candidate_assets`, con per ciascuno:
  - `asset_id`: identificativo univoco.
  - `topic_id`: l'argomento in cui compare.
  - `source_id` e `page`: provenienza.
  - `obsidian_path`: il percorso che dovrà essere usato nel Markdown.
  - `nearby_text`: il testo che circondava l'immagine nella slide (utile per capire di cosa parlava).
- Le immagini stesse in allegato.

## Regole di Selezione
1. **Valore Pedagogico**: L'immagine aggiunge valore rispetto al solo testo? Un diagramma, un grafico, una tabella strutturata sono preziosi. Una clip art di persone in riunione non lo è.
2. **Qualità dell'informazione**: Se il `nearby_text` spiega già tutto perfettamente e l'immagine è solo un'icona stilizzata che ripete il concetto visivamente in modo debole, scartala.
3. **Mantenimento di pattern importanti**: Diagrammi architetturali, cicli di vita, classi UML, flussi di processo devono *quasi sempre* essere mantenuti.
4. **Rifiuto Immagini Testuali (CRITICO)**: **SCARTA CATEGORICAMENTE** qualsiasi immagine che contiene esclusivamente testo (ad esempio: titoli di slide come "Visual programming", elenchi puntati, o paragrafi estratti come immagine per errore del parser). Il testo va nel markdown, non nelle immagini!

## Requisiti di Output
Restituisci **ESCLUSIVAMENTE YAML**, racchiuso in un blocco ````yaml ````.
Non aggiungere alcun commento fuori dal blocco.
Utilizza ESATTAMENTE questo formato:

```yaml
selected_assets:
  - asset_id: "<asset_id>"
    decision: "include"
    pedagogical_value: "<high | medium>"
    role: "<es: process_diagram, uml_class, architecture, code_snippet, visual_example>"
    reason: "<Breve giustificazione semantica. Perché è utile?>"
    placement_hint:
      topic_id: "<topic_id>"
      after_concept: "<parola chiave o concetto dopo cui ha senso posizionarla>"

rejected_assets:
  - asset_id: "<asset_id>"
    decision: "reject"
    reason: "<es: decorative_title, generic_clipart, low_information_value>"
```


---

# RUNTIME INPUT: CANDIDATE ASSETS

```yaml
candidate_assets:
- asset_id: a8a67443-1225-4b3a-9a52-31f5b76faace
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '0'
  obsidian_path: assets/d234c4c9_p0_i0.png
  nearby_text: ''
- asset_id: 147cdd2d-5ec8-4980-a1ba-57b5d8b11f46
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '0'
  obsidian_path: assets/d234c4c9_p0_i1.png
  nearby_text: ''
- asset_id: 40f730dc-d4df-4aa9-90c7-9f2f327b5305
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '1'
  obsidian_path: assets/d234c4c9_p1_i0.png
  nearby_text: ''
- asset_id: ee24eb37-f97c-4933-8cda-8c8a09dc5af8
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '2'
  obsidian_path: assets/d234c4c9_p2_i0.png
  nearby_text: ''
- asset_id: 771dc522-afca-4bd2-8096-f5983e885a7f
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '3'
  obsidian_path: assets/d234c4c9_p3_i0.png
  nearby_text: ''
- asset_id: 34bcd459-ed9a-473b-bca2-b6b61a369ae0
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '4'
  obsidian_path: assets/d234c4c9_p4_i0.png
  nearby_text: ''
- asset_id: c3aa4797-da22-4642-a180-1941448bc730
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '5'
  obsidian_path: assets/d234c4c9_p5_i0.png
  nearby_text: ''
- asset_id: 9a658522-193e-4458-84fd-9c30843ca262
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '5'
  obsidian_path: assets/d234c4c9_p5_i1.jpeg
  nearby_text: ''
- asset_id: 197bfa35-f069-4713-95ec-2c0e64a536ea
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '5'
  obsidian_path: assets/d234c4c9_p5_i2.png
  nearby_text: ''
- asset_id: 45d33581-cd11-405e-8611-3ba0e7c5c7f3
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '6'
  obsidian_path: assets/d234c4c9_p6_i0.png
  nearby_text: ''
- asset_id: 3799c78e-82dd-447c-870e-ebc016b77d42
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '6'
  obsidian_path: assets/d234c4c9_p6_i1.png
  nearby_text: ''
- asset_id: 64f0679a-cd5f-4299-a507-7fa20c2be3a9
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '6'
  obsidian_path: assets/d234c4c9_p6_i2.png
  nearby_text: ''
- asset_id: 9584b860-c340-454b-b77f-7a55b9b2f796
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '6'
  obsidian_path: assets/d234c4c9_p6_i3.png
  nearby_text: ''
- asset_id: 5bca4451-731c-441d-bdc9-968e714636e5
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '7'
  obsidian_path: assets/d234c4c9_p7_i0.png
  nearby_text: ''
- asset_id: 1e2901da-435c-4397-b5fa-384661817739
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '7'
  obsidian_path: assets/d234c4c9_p7_i1.png
  nearby_text: ''
- asset_id: b8c22712-0992-44c6-8f3b-10083bc4043c
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '8'
  obsidian_path: assets/d234c4c9_p8_i0.png
  nearby_text: ''
- asset_id: c1ed17ae-7e52-4cf6-86d5-c78df94cb8d6
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '8'
  obsidian_path: assets/d234c4c9_p8_i1.png
  nearby_text: ''
- asset_id: ff95ccc0-0586-46af-ae17-cfaa00619715
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '8'
  obsidian_path: assets/d234c4c9_p8_i2.png
  nearby_text: ''
- asset_id: 9d20aba1-1d24-42a7-9acb-dfcb3cb4fa24
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '8'
  obsidian_path: assets/d234c4c9_p8_i3.png
  nearby_text: ''
- asset_id: 7772999b-a569-4c19-a2e1-1aeba72c9c00
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '8'
  obsidian_path: assets/d234c4c9_p8_i4.png
  nearby_text: ''
- asset_id: dcc11333-4e3f-40ef-a7cf-bdb3394ee219
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '9'
  obsidian_path: assets/d234c4c9_p9_i0.png
  nearby_text: ''
- asset_id: 0a08ef0d-57a7-4a1f-aeae-03bbd0305b38
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '10'
  obsidian_path: assets/d234c4c9_p10_i0.png
  nearby_text: ''
- asset_id: ae09a569-f0f8-4997-bc6c-6f58123831e4
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '11'
  obsidian_path: assets/d234c4c9_p11_i0.png
  nearby_text: ''
- asset_id: 0a93e8d2-3329-4fc5-a3c3-010a299e3261
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '12'
  obsidian_path: assets/d234c4c9_p12_i0.png
  nearby_text: ''
- asset_id: b6f6fe09-e1eb-401a-a9a5-eca174abb213
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '12'
  obsidian_path: assets/d234c4c9_p12_i1.png
  nearby_text: ''
- asset_id: 499748bc-bf1c-42b0-9eac-794bda790dab
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '13'
  obsidian_path: assets/d234c4c9_p13_i0.png
  nearby_text: ''
- asset_id: 8e2e032f-8a54-484a-b29d-2bf7a3db6fca
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '14'
  obsidian_path: assets/d234c4c9_p14_i0.png
  nearby_text: ''
- asset_id: c4548f85-ed58-4cb5-bd1d-d1481bff7508
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '14'
  obsidian_path: assets/d234c4c9_p14_i1.png
  nearby_text: ''
- asset_id: d333ae61-efef-47e7-909f-b3c4dd390d7a
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '14'
  obsidian_path: assets/d234c4c9_p14_i2.png
  nearby_text: ''
- asset_id: cb33e99e-f82d-4de4-99c9-a6219242f117
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '15'
  obsidian_path: assets/d234c4c9_p15_i0.png
  nearby_text: ''
- asset_id: 23aa0abe-5da9-4a95-b52d-d58552d2e933
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '15'
  obsidian_path: assets/d234c4c9_p15_i1.png
  nearby_text: ''
- asset_id: cce1f1c4-1322-4d64-9793-be1a5e14d79d
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '15'
  obsidian_path: assets/d234c4c9_p15_i2.png
  nearby_text: ''
- asset_id: d4bc6fd1-831b-49d0-a70f-db6c61c725fa
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '15'
  obsidian_path: assets/d234c4c9_p15_i3.png
  nearby_text: ''
- asset_id: 5ad94e70-40ff-4386-befe-ad0df0446f6c
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '16'
  obsidian_path: assets/d234c4c9_p16_i0.png
  nearby_text: ''
- asset_id: 6098411d-1715-47c4-aef2-98b587b0769c
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '16'
  obsidian_path: assets/d234c4c9_p16_i1.png
  nearby_text: ''
- asset_id: 53b1e4a1-dad9-4ead-a55e-7d019ac9409b
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '16'
  obsidian_path: assets/d234c4c9_p16_i2.png
  nearby_text: ''
- asset_id: d6dd9b6c-81f7-4b05-a596-252eeb60a8d9
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '16'
  obsidian_path: assets/d234c4c9_p16_i3.png
  nearby_text: ''
- asset_id: 2fa2a51d-6dbb-4728-9d23-98d194cd69f7
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '17'
  obsidian_path: assets/d234c4c9_p17_i0.png
  nearby_text: ''
- asset_id: 790ad1b1-050c-4c13-a900-c9ce7703877a
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '17'
  obsidian_path: assets/d234c4c9_p17_i1.png
  nearby_text: ''
- asset_id: da8a38f1-0ab1-479b-937d-a4b249bb3ddf
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '18'
  obsidian_path: assets/d234c4c9_p18_i0.png
  nearby_text: ''
- asset_id: 53807abd-7e07-48df-b5c6-9faced739ff5
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '19'
  obsidian_path: assets/d234c4c9_p19_i0.png
  nearby_text: ''
- asset_id: c980b10e-d651-42e0-b561-f742bb76932c
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '19'
  obsidian_path: assets/d234c4c9_p19_i1.png
  nearby_text: ''
- asset_id: 15ee9e75-02e7-43ff-a551-1254626ab353
  topic_id: classic-process-models
  source_id: slides-02-process-1
  page: '20'
  obsidian_path: assets/d234c4c9_p20_i0.png
  nearby_text: ''
- asset_id: 358abe74-ba2f-4169-9af1-7434f2965939
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '21'
  obsidian_path: assets/d234c4c9_p21_i0.png
  nearby_text: ''
- asset_id: eb5c3a9b-2364-4582-a0f4-a65634ddf579
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '22'
  obsidian_path: assets/d234c4c9_p22_i0.png
  nearby_text: ''
- asset_id: e3d7cef3-66e9-4344-a3f6-dac210dc104c
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '23'
  obsidian_path: assets/d234c4c9_p23_i0.png
  nearby_text: ''
- asset_id: e0ccfe1e-1bb3-478e-b4f0-96527265095d
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '23'
  obsidian_path: assets/d234c4c9_p23_i1.png
  nearby_text: ''
- asset_id: 71f053ba-963f-465c-8294-0ab747e76f82
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '24'
  obsidian_path: assets/d234c4c9_p24_i0.png
  nearby_text: ''
- asset_id: b1459ea3-6f3a-4a2e-b325-9509c31650ad
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '25'
  obsidian_path: assets/d234c4c9_p25_i0.png
  nearby_text: ''
- asset_id: 2f426f45-4a8a-4460-8837-a23f8a38000d
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '25'
  obsidian_path: assets/d234c4c9_p25_i1.png
  nearby_text: ''
- asset_id: d9ec7353-5d8a-40ba-b7f5-da885ebe1c54
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '25'
  obsidian_path: assets/d234c4c9_p25_i2.png
  nearby_text: ''
- asset_id: f707fd6a-97c8-43da-ace1-e5fb91af44ad
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '25'
  obsidian_path: assets/d234c4c9_p25_i3.png
  nearby_text: ''
- asset_id: 2846e4ed-7aa2-4234-afe8-67bcaefec7fc
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '25'
  obsidian_path: assets/d234c4c9_p25_i4.png
  nearby_text: ''
- asset_id: c01b0bbf-babc-496e-b417-eed3033d2b40
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '26'
  obsidian_path: assets/d234c4c9_p26_i0.png
  nearby_text: ''
- asset_id: 1000cc25-1f30-489d-be7a-29a924ded95e
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '26'
  obsidian_path: assets/d234c4c9_p26_i1.png
  nearby_text: ''
- asset_id: 4d35d8ca-f7bb-40e5-a4fb-492b235d735a
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '26'
  obsidian_path: assets/d234c4c9_p26_i2.png
  nearby_text: ''
- asset_id: 95ca8fcc-5889-4aee-82f9-715342f929de
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '27'
  obsidian_path: assets/d234c4c9_p27_i0.png
  nearby_text: ''
- asset_id: 7f910ba1-2709-4031-9f79-922d0aae61d2
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '28'
  obsidian_path: assets/d234c4c9_p28_i0.png
  nearby_text: ''
- asset_id: f307d147-5855-4b30-b431-7da602a6cf5b
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '29'
  obsidian_path: assets/d234c4c9_p29_i0.png
  nearby_text: ''
- asset_id: 11be0f3e-6bce-408f-a724-fff7768a0e5d
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '29'
  obsidian_path: assets/d234c4c9_p29_i1.png
  nearby_text: ''
- asset_id: 7c2bb22e-0aff-4ba4-bb49-b72528a3f52a
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '30'
  obsidian_path: assets/d234c4c9_p30_i0.png
  nearby_text: ''
- asset_id: 987ac713-1fca-4ff2-b4a8-fcd673cb14e5
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '30'
  obsidian_path: assets/d234c4c9_p30_i1.png
  nearby_text: ''
- asset_id: 64c13f65-bc2d-48a9-95a7-f17545592a97
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '30'
  obsidian_path: assets/d234c4c9_p30_i2.png
  nearby_text: ''
- asset_id: f03146b8-1105-4c77-b5b7-6f195e39db21
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '30'
  obsidian_path: assets/d234c4c9_p30_i3.png
  nearby_text: ''
- asset_id: a6e3d78a-84a1-4a90-9bba-3d1942a4843c
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '30'
  obsidian_path: assets/d234c4c9_p30_i4.png
  nearby_text: ''
- asset_id: 2a7d7cb9-74bc-476c-8bcb-e32de61b3a98
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '30'
  obsidian_path: assets/d234c4c9_p30_i5.png
  nearby_text: ''
- asset_id: 2ef19fe6-c88d-4cd9-b980-ea0b7c57496b
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '30'
  obsidian_path: assets/d234c4c9_p30_i6.png
  nearby_text: ''
- asset_id: 02e6fc56-6d15-4986-a401-5b46ebc6da55
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '31'
  obsidian_path: assets/d234c4c9_p31_i0.png
  nearby_text: ''
- asset_id: 1da2e813-a46c-4b0b-9585-1470b04300e5
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '31'
  obsidian_path: assets/d234c4c9_p31_i1.png
  nearby_text: ''
- asset_id: 18d65be4-2d09-4ec5-926e-327d7b7ab81f
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '31'
  obsidian_path: assets/d234c4c9_p31_i2.png
  nearby_text: ''
- asset_id: 922e9903-1df4-491b-adc2-849456874cac
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '31'
  obsidian_path: assets/d234c4c9_p31_i3.png
  nearby_text: ''
- asset_id: aabf4752-5a2a-40a9-bafb-971b768fbd06
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '31'
  obsidian_path: assets/d234c4c9_p31_i4.png
  nearby_text: ''
- asset_id: e5cf9c98-5fa9-4432-bbde-ce59ecdb2583
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '32'
  obsidian_path: assets/d234c4c9_p32_i0.jpeg
  nearby_text: ''
- asset_id: d158ff79-2b77-48aa-90b7-f68d150c0f2b
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '32'
  obsidian_path: assets/d234c4c9_p32_i1.png
  nearby_text: ''
- asset_id: 3b128e4f-6add-4bc5-94d4-d403aa3dc315
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '32'
  obsidian_path: assets/d234c4c9_p32_i2.png
  nearby_text: ''
- asset_id: f5e29ce5-c78e-482e-a390-b983d6eb867d
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '32'
  obsidian_path: assets/d234c4c9_p32_i3.png
  nearby_text: ''
- asset_id: ac73dadc-81de-49ec-a605-b7fe55b0c789
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '33'
  obsidian_path: assets/d234c4c9_p33_i0.png
  nearby_text: ''
- asset_id: 6339c83b-c265-4835-9cf9-cb76ea470f67
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '34'
  obsidian_path: assets/d234c4c9_p34_i0.png
  nearby_text: ''
- asset_id: 5e6f2c04-b12e-4c48-8f48-ff9a0ea103e3
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '35'
  obsidian_path: assets/d234c4c9_p35_i0.png
  nearby_text: ''
- asset_id: 5caa78c0-1741-40f2-b6e0-ea46be8ec404
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '36'
  obsidian_path: assets/d234c4c9_p36_i0.png
  nearby_text: ''
- asset_id: d545cc23-be93-4ed1-b80b-50b6a9837624
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '36'
  obsidian_path: assets/d234c4c9_p36_i1.png
  nearby_text: ''
- asset_id: b87780e0-420a-45e6-8189-a382e74798d9
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '37'
  obsidian_path: assets/d234c4c9_p37_i0.png
  nearby_text: ''
- asset_id: 4354c427-3776-4864-84b6-afd3f2133947
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '37'
  obsidian_path: assets/d234c4c9_p37_i1.png
  nearby_text: ''
- asset_id: 34fd7dea-c8a7-44ad-83a6-5bb8bee53a5d
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '37'
  obsidian_path: assets/d234c4c9_p37_i2.png
  nearby_text: ''
- asset_id: b323ef47-aa4d-4d6c-acf0-bd0061fc822b
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '38'
  obsidian_path: assets/d234c4c9_p38_i0.png
  nearby_text: ''
- asset_id: bdf10705-0c2c-48c8-a3ca-abca44508bd0
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '39'
  obsidian_path: assets/d234c4c9_p39_i0.png
  nearby_text: ''
- asset_id: 3a67d87c-fc20-470b-b5cb-567e4c6a3f87
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '39'
  obsidian_path: assets/d234c4c9_p39_i1.png
  nearby_text: ''
- asset_id: f82c0039-5265-4599-ba5c-e82884898a65
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '40'
  obsidian_path: assets/d234c4c9_p40_i0.png
  nearby_text: ''
- asset_id: 9ba95866-c83a-4d85-b83a-b0f0dfb32f7d
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '40'
  obsidian_path: assets/d234c4c9_p40_i1.png
  nearby_text: ''
- asset_id: 8694781d-5be2-448b-b7c1-e043ec65bca2
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '41'
  obsidian_path: assets/d234c4c9_p41_i0.png
  nearby_text: ''
- asset_id: 17a0fcfc-ab7c-42f4-bb1c-16677356db87
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '41'
  obsidian_path: assets/d234c4c9_p41_i1.png
  nearby_text: ''
- asset_id: 2c4f7047-a505-423f-8e48-845c11890e55
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '42'
  obsidian_path: assets/d234c4c9_p42_i0.png
  nearby_text: ''
- asset_id: 25a6560e-d04b-40c2-81a2-282f78a50a6d
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '43'
  obsidian_path: assets/d234c4c9_p43_i0.png
  nearby_text: ''
- asset_id: 58f3c7ad-686a-4082-9ed3-d0b12fa19d18
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '44'
  obsidian_path: assets/d234c4c9_p44_i0.png
  nearby_text: ''
- asset_id: b43aff5d-f760-4a05-bb93-3f03a34ae36c
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '44'
  obsidian_path: assets/d234c4c9_p44_i1.png
  nearby_text: ''
- asset_id: 0990409d-6a49-4d89-94f1-1e4733010370
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '45'
  obsidian_path: assets/d234c4c9_p45_i0.png
  nearby_text: ''
- asset_id: 0d929f34-fffc-4113-9495-4b9b0b5c70ef
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '45'
  obsidian_path: assets/d234c4c9_p45_i1.png
  nearby_text: ''
- asset_id: c0ac0229-7608-41d0-a3c1-2470fd9e7aa1
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '45'
  obsidian_path: assets/d234c4c9_p45_i2.png
  nearby_text: ''
- asset_id: eab79d43-070a-4bb5-ae77-791b4802e468
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '46'
  obsidian_path: assets/d234c4c9_p46_i0.png
  nearby_text: ''
- asset_id: 693b1dc2-68ee-4a61-913d-9cd0189fdaf3
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '46'
  obsidian_path: assets/d234c4c9_p46_i1.png
  nearby_text: ''
- asset_id: 3f6d2aee-5a13-474e-b6d9-4c57257fd4f4
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '46'
  obsidian_path: assets/d234c4c9_p46_i2.png
  nearby_text: ''
- asset_id: fc7d8a15-20b6-4069-8c30-f9766354f384
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '46'
  obsidian_path: assets/d234c4c9_p46_i3.png
  nearby_text: ''
- asset_id: 375de843-993c-4944-84f9-4b9ef026d75a
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '46'
  obsidian_path: assets/d234c4c9_p46_i4.png
  nearby_text: ''
- asset_id: 0d18a3d7-2c31-4c13-a86a-80e1956a6a07
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '46'
  obsidian_path: assets/d234c4c9_p46_i5.png
  nearby_text: ''
- asset_id: 46e0fc14-3471-4fbf-915c-31f39499277e
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '46'
  obsidian_path: assets/d234c4c9_p46_i6.jpeg
  nearby_text: ''
- asset_id: 457a4df2-7a85-454f-b894-441d14705842
  topic_id: iterative-process-models
  source_id: slides-02-process-1
  page: '47'
  obsidian_path: assets/d234c4c9_p47_i0.png
  nearby_text: ''
- asset_id: 2680fd7b-4aba-4589-87b5-0ae209a5b2d5
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '48'
  obsidian_path: assets/d234c4c9_p48_i0.png
  nearby_text: ''
- asset_id: 8b5872b0-b821-423d-8087-d61e9fe91b18
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '48'
  obsidian_path: assets/d234c4c9_p48_i1.png
  nearby_text: ''
- asset_id: b617bfbe-1ddc-4aac-8077-ac777d70604a
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '49'
  obsidian_path: assets/d234c4c9_p49_i0.png
  nearby_text: ''
- asset_id: 6a25b1fa-caa3-42a8-8a78-6348916ed475
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '49'
  obsidian_path: assets/d234c4c9_p49_i1.png
  nearby_text: ''
- asset_id: 4b2e5fee-a5a9-4bc2-ba18-1d508255f519
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '49'
  obsidian_path: assets/d234c4c9_p49_i2.png
  nearby_text: ''
- asset_id: ddd842b5-bb2f-4adc-b13a-36cd2498f4c7
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '49'
  obsidian_path: assets/d234c4c9_p49_i3.png
  nearby_text: ''
- asset_id: e96045a8-ec45-45a6-ba03-5c7faacdf4a2
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '49'
  obsidian_path: assets/d234c4c9_p49_i4.png
  nearby_text: ''
- asset_id: d480cb76-c38c-45ff-9e11-01ac723497ce
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '49'
  obsidian_path: assets/d234c4c9_p49_i5.png
  nearby_text: ''
- asset_id: 9e0c2b3e-870b-4109-a304-b137b44624fe
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '50'
  obsidian_path: assets/d234c4c9_p50_i0.png
  nearby_text: ''
- asset_id: ef26eebc-6ff0-498b-ac34-698fcb5a6875
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '51'
  obsidian_path: assets/d234c4c9_p51_i0.png
  nearby_text: ''
- asset_id: 09e5fc82-82df-425d-993c-818f5ffd9fba
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '51'
  obsidian_path: assets/d234c4c9_p51_i1.jpeg
  nearby_text: ''
- asset_id: bbab2792-aa20-4021-aff0-a600781d07f2
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '52'
  obsidian_path: assets/d234c4c9_p52_i0.png
  nearby_text: ''
- asset_id: c7f32bfd-34f9-4244-9e82-3512b53958a6
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '52'
  obsidian_path: assets/d234c4c9_p52_i1.jpeg
  nearby_text: ''
- asset_id: 905ce492-4382-4f7d-ad17-0af7fa330e15
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '53'
  obsidian_path: assets/d234c4c9_p53_i0.png
  nearby_text: ''
- asset_id: d72937ea-8575-4ad7-a86e-de38b49ed2eb
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '53'
  obsidian_path: assets/d234c4c9_p53_i1.jpeg
  nearby_text: ''
- asset_id: 89c31ec7-b7bc-40a6-bdfa-8875db8c46fd
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '57'
  obsidian_path: assets/d234c4c9_p57_i0.png
  nearby_text: ''
- asset_id: 53db57aa-6745-4083-9480-9be359d30d3b
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '57'
  obsidian_path: assets/d234c4c9_p57_i1.jpeg
  nearby_text: ''
- asset_id: 7bee35d2-bf00-4766-9772-86448323fb2e
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i0.png
  nearby_text: ''
- asset_id: 3a6b5f64-c9c9-4d51-9168-efba3d7e14ff
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i1.png
  nearby_text: ''
- asset_id: 0353a105-2653-41bf-9ca7-ecfecc6fef4b
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i2.png
  nearby_text: ''
- asset_id: 300523c5-1b22-4ccc-b46e-a9bdc97edd87
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i3.png
  nearby_text: ''
- asset_id: 83c959f3-8a99-49e2-b1f9-8a9b6fbafc38
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i4.png
  nearby_text: ''
- asset_id: 7a0c701a-2998-48f8-8835-161a3ee83f7f
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i5.png
  nearby_text: ''
- asset_id: 98233bf3-ba9e-43f3-8675-ce7455040502
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i6.png
  nearby_text: ''
- asset_id: 3cac629a-89c0-4c25-a9d9-c475e0c73265
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i7.png
  nearby_text: ''
- asset_id: 6d1e66bb-45c3-48b5-a9f0-29c483aea6ce
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i8.png
  nearby_text: ''
- asset_id: ebb4e6c8-303b-4282-8114-005b2046f16e
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '58'
  obsidian_path: assets/d234c4c9_p58_i9.jpeg
  nearby_text: ''
- asset_id: bf23ef63-74b7-4fca-aa42-f1bac3cf0d30
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i0.jpeg
  nearby_text: ''
- asset_id: 915ce46c-bc29-4ee5-8853-4ec1992ccd16
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i1.png
  nearby_text: ''
- asset_id: 7c3cf4cd-d83e-44dd-a5e7-26e97c752960
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i2.png
  nearby_text: ''
- asset_id: e48b857a-0c92-49bf-8919-c3e7c603c0a9
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i3.png
  nearby_text: ''
- asset_id: 3ba4e37b-edb0-473d-9386-0e6fe3baf2e2
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i4.png
  nearby_text: ''
- asset_id: 85275c0a-ef3c-4d0a-a920-3129f60669ef
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i5.png
  nearby_text: ''
- asset_id: 85c7e907-98e1-49cf-91da-f64b349556ee
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i6.png
  nearby_text: ''
- asset_id: 7017f005-b316-4a30-abb7-059c55a2907f
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i7.png
  nearby_text: ''
- asset_id: db138e41-c6be-4176-b379-23da7df6edb0
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i8.png
  nearby_text: ''
- asset_id: ffe022c8-acf0-408d-8d64-e96618877dd9
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '59'
  obsidian_path: assets/d234c4c9_p59_i9.png
  nearby_text: ''
- asset_id: 24435f16-f1bb-48c3-877c-3d3a7b487ac1
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '54'
  obsidian_path: assets/d234c4c9_p54_i0.png
  nearby_text: ''
- asset_id: fdee0548-22f1-476b-b196-3d8f77fd5a34
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '55'
  obsidian_path: assets/d234c4c9_p55_i0.png
  nearby_text: ''
- asset_id: b7c0c6a0-d3d9-49e1-b01b-21267f40ba35
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '56'
  obsidian_path: assets/d234c4c9_p56_i0.png
  nearby_text: ''
- asset_id: ef182c8e-c28d-4811-af37-83315f7bcf89
  topic_id: corporate-models
  source_id: slides-02-process-1
  page: '56'
  obsidian_path: assets/d234c4c9_p56_i1.png
  nearby_text: ''
- asset_id: dcf43b9b-0d4f-463e-bf02-580447acf1da
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '0'
  obsidian_path: assets/4f64ac69_p0_i0.png
  nearby_text: ''
- asset_id: 6237beec-c26a-4fa5-af88-0a25bf175fa8
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '0'
  obsidian_path: assets/4f64ac69_p0_i1.png
  nearby_text: ''
- asset_id: edabd826-99ac-4993-b2ae-0aff759d524a
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '1'
  obsidian_path: assets/4f64ac69_p1_i0.png
  nearby_text: ''
- asset_id: 600deab8-ab8a-4bc4-8a3c-e882d9b12983
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '1'
  obsidian_path: assets/4f64ac69_p1_i1.png
  nearby_text: ''
- asset_id: fda5383a-e451-4d56-a52c-a8a7b82bee37
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '2'
  obsidian_path: assets/4f64ac69_p2_i0.png
  nearby_text: ''
- asset_id: 25547837-ae27-4530-8fd0-4f4101a2e528
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '2'
  obsidian_path: assets/4f64ac69_p2_i1.png
  nearby_text: ''
- asset_id: 45b79d54-1da6-4b2f-8f04-1832df595f43
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '3'
  obsidian_path: assets/4f64ac69_p3_i0.png
  nearby_text: ''
- asset_id: c9ef4e27-6d6c-42b3-9fb9-1607b21055f9
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '3'
  obsidian_path: assets/4f64ac69_p3_i1.png
  nearby_text: ''
- asset_id: dfa76384-43e5-4404-ab09-9f74bb6cd970
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '4'
  obsidian_path: assets/4f64ac69_p4_i0.png
  nearby_text: ''
- asset_id: f2281218-fcc9-40ba-8906-2144008ff6b7
  topic_id: corporate-models
  source_id: slides-02-process-2
  page: '4'
  obsidian_path: assets/4f64ac69_p4_i1.png
  nearby_text: ''
- asset_id: a06c75aa-7ebc-406f-83de-0aa3463d032e
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '5'
  obsidian_path: assets/4f64ac69_p5_i0.png
  nearby_text: ''
- asset_id: b10aaddc-71b5-41e6-8b1a-e600c88ee233
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '6'
  obsidian_path: assets/4f64ac69_p6_i0.png
  nearby_text: ''
- asset_id: 7bb48fdc-f64a-4c01-a837-f39324307346
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '7'
  obsidian_path: assets/4f64ac69_p7_i0.png
  nearby_text: ''
- asset_id: d6046046-a1b7-4f4c-8159-997fedbf8d3b
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '7'
  obsidian_path: assets/4f64ac69_p7_i1.png
  nearby_text: ''
- asset_id: 15697de7-2b5c-4601-bef6-a099ecd4686e
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '8'
  obsidian_path: assets/4f64ac69_p8_i0.png
  nearby_text: ''
- asset_id: 1ddda734-e5dc-477f-9200-834b3cab72de
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '9'
  obsidian_path: assets/4f64ac69_p9_i0.png
  nearby_text: ''
- asset_id: 6e0d85f0-69d8-4b7d-9b3b-a2e72d485297
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '10'
  obsidian_path: assets/4f64ac69_p10_i0.png
  nearby_text: ''
- asset_id: 3534b0f6-b1f6-407d-952b-95b9b9006f2e
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '10'
  obsidian_path: assets/4f64ac69_p10_i1.png
  nearby_text: ''
- asset_id: fab67d3e-2719-46d0-b093-5cab100af2ee
  topic_id: agile-and-scrum
  source_id: slides-02-process-2
  page: '11'
  obsidian_path: assets/4f64ac69_p11_i0.png
  nearby_text: ''
- asset_id: b3597022-5f8b-424a-bc8f-f859b426df61
  topic_id: cmm
  source_id: slides-02-process-2
  page: '12'
  obsidian_path: assets/4f64ac69_p12_i0.png
  nearby_text: ''
- asset_id: a7cfd6a8-1100-4cfb-842c-789b92af1f38
  topic_id: cmm
  source_id: slides-02-process-2
  page: '13'
  obsidian_path: assets/4f64ac69_p13_i0.png
  nearby_text: ''
- asset_id: d08a5793-d89b-4136-a72b-f5f72e832d1e
  topic_id: cmm
  source_id: slides-02-process-2
  page: '15'
  obsidian_path: assets/4f64ac69_p15_i0.png
  nearby_text: ''
- asset_id: 030a0253-32ca-4950-9b74-6dd9019d6047
  topic_id: cmm
  source_id: slides-02-process-2
  page: '15'
  obsidian_path: assets/4f64ac69_p15_i1.png
  nearby_text: ''
- asset_id: fd3cc05e-bb43-4201-9796-d3a9bb486e94
  topic_id: cmm
  source_id: slides-02-process-2
  page: '15'
  obsidian_path: assets/4f64ac69_p15_i2.png
  nearby_text: ''
- asset_id: 4c11104e-ee60-46be-abb1-2b451083a108
  topic_id: cmm
  source_id: slides-02-process-2
  page: '14'
  obsidian_path: assets/4f64ac69_p14_i0.png
  nearby_text: ''
- asset_id: d094a71a-17b4-4ff6-b1ce-2085730ec156
  topic_id: cmm
  source_id: slides-02-process-2
  page: '16'
  obsidian_path: assets/4f64ac69_p16_i0.png
  nearby_text: ''
- asset_id: 32b14287-7cc3-4c67-aa8d-946df77990f1
  topic_id: cmm
  source_id: slides-02-process-2
  page: '17'
  obsidian_path: assets/4f64ac69_p17_i0.png
  nearby_text: ''
- asset_id: 2f75960e-0287-4f28-b815-0546a41b81ad
  topic_id: cmm
  source_id: slides-02-process-2
  page: '17'
  obsidian_path: assets/4f64ac69_p17_i1.jpeg
  nearby_text: ''
- asset_id: 8b88dbd5-c6cd-4a2d-8fc3-b654cea4aaca
  topic_id: cmm
  source_id: slides-02-process-2
  page: '18'
  obsidian_path: assets/4f64ac69_p18_i0.png
  nearby_text: ''
- asset_id: 8524bc16-d146-4aa2-a366-3280ba22f87e
  topic_id: cmm
  source_id: slides-02-process-2
  page: '18'
  obsidian_path: assets/4f64ac69_p18_i1.jpeg
  nearby_text: ''

```
