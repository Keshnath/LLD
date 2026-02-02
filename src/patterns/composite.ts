interface FileSystemItem {
  showDetails(): void;
    getSize(): number;
}

class FileItem implements FileSystemItem {
  constructor(private name: string, private size: number) {}

  showDetails(): void {
    console.log(`📄 File: ${this.name}, Size: ${this.size}KB`);
  }
    getSize(): number {
    return this.size;
  }
}
class FolderItem implements FileSystemItem {
  private children: FileSystemItem[] = [];

  constructor(private name: string) {}

  add(item: FileSystemItem): void {
    this.children.push(item);
  }

    getSize(): number {
    return this.children.reduce(
      (total, child) => total + child.getSize(),
      0
    );
  }

  showDetails(): void {
    console.log(`📁 Folder: ${this.name}`);
    this.children.forEach(child => child.showDetails());
  }
}


const file1 = new FileItem("resume.pdf", 120);
const file2 = new FileItem("photo.png", 300);
const file3 = new FileItem("notes.txt", 80);

const docs = new FolderItem("Documents");
docs.add(file1);
docs.add(file2);

const root = new FolderItem("Root");
root.add(docs);
root.add(file3);

root.showDetails();
