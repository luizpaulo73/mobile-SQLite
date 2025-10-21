import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("notas.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        createdAt TEXT NOT NULL
    )    
`);

export function getNotes() {
    return db.getAllSync("SELECT * FROM notes ORDER BY id DESC");
}

export function addNote(title: string, content: string) {
    const createdAt = new Date().toISOString();
    db.runSync("INSERT INTO notes (title, content, createdAt) VALUES (?, ?, ?)", [title, content, createdAt]);
};

export function updateNote(id: number, title: string, content: string) {
    db.runSync("UPDATE notes SET title=?, content=?, WHERE id=?", [title, content, id]);
};

export function deleteNote(id: number) {
    db.runSync("DELETE FROM notes WHERE id=?", [id]);
};