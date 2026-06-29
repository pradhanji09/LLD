// Text and Image but Scallable
// Can add Text and Image, Render All Added Document

interface DocumentElement {
  value: string;
  render(): void;
}

class TextElement implements DocumentElement {
  value: string;
  constructor(private text: string) {
    this.value = text;
  }

  render(): void {
    console.log(`Rendering ${this.value} text`);
  }
}

class ImageElement implements DocumentElement {
  value: string;
  constructor(private image: string) {
    this.value = image;
  }

  render(): void {
    console.log(`Rendering ${this.value} image`);
  }
}

class Document {
  private elements: DocumentElement[] = [];

  addElement(element: DocumentElement): void {
    this.elements.push(element);
  }

  renderAll(): void {
    for (const element of this.elements) {
      element.render();
    }
  }

  getAllData(): string {
    return this.elements.map((el) => el.value).join(" | ");
  }
}

// Where To Save DB e.g MongoDb, SQL & File
interface Persitance {
  save(documentData: string): void;
}

class SaveToFile implements Persitance {
  save(documentData: string): void {
    console.log(`This is Saving to File ${documentData}`);
  }
}

class DocumentEditor {
  private doc: Document;
  private storage: Persitance;

  constructor(doc: Document, storage: Persitance) {
    this.doc = doc;
    this.storage = storage;
  }

  saveDocument(): void {
    const data = this.doc.getAllData();
    console.log(data);
    this.storage.save(data);
  }
}

const document = new Document();
const toFile = new SaveToFile();
const editor = new DocumentEditor(document, toFile);

// Add Element
document.addElement(new TextElement("TEST1"));
document.addElement(new ImageElement("Image1"));

document.renderAll();
editor.saveDocument();
