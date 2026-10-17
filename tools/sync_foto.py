#!/usr/bin/env python3
"""
Sincronizzatore Foto - Singolo script minimale con interfaccia grafica.
Librerie usate: solo quelle integrate in Python (nessuna installazione necessaria).
"""

import os
import json
from pathlib import Path
import tkinter as tk
from tkinter import ttk, filedialog, messagebox

# Testo nitido su schermi Windows
try:
    from ctypes import windll
    windll.shcore.SetProcessDpiAwareness(1)
except Exception:
    pass

SYSTEM_FILES = {".DS_Store", "Thumbs.db", "desktop.ini"}


def get_files(folder: Path):
    """Raccoglie i percorsi relativi di tutti i file nella cartella."""
    files = set()
    for root, _, filenames in os.walk(folder):
        for f in filenames:
            if f in SYSTEM_FILES:
                continue
            rel = (Path(root) / f).relative_to(folder).as_posix()
            files.add(rel)
    return files


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Sincronizzatore Foto")
        self.geometry("520x420")
        self.resizable(False, False)
        self.configure(bg="#F8FAFC")

        # Stile di base
        style = ttk.Style(self)
        style.theme_use("clam")
        style.configure(".", font=("Segoe UI", 10), background="#F8FAFC")
        style.configure("TButton", font=("Segoe UI", 10, "bold"), padding=6)
        style.configure("Action.TButton", font=("Segoe UI", 10, "bold"), background="#0284C7", foreground="white")
        style.map("Action.TButton", background=[("active", "#0369A1")])
        style.configure("Delete.TButton", font=("Segoe UI", 10, "bold"), background="#DC2626", foreground="white")
        style.map("Delete.TButton", background=[("active", "#B91C1C")])

        # Titolo
        tk.Label(
            self,
            text="Sincronizzatore Foto",
            font=("Segoe UI", 14, "bold"),
            bg="#F8FAFC",
            fg="#0F172A"
        ).pack(pady=(16, 12))

        # Scelta Opzione (Radio Button)
        self.mode_var = tk.StringVar(value="1")

        mode_frame = tk.Frame(self, bg="#F8FAFC")
        mode_frame.pack(fill="x", padx=24, pady=(0, 14))

        rb1 = ttk.Radiobutton(
            mode_frame,
            text="Opzione 1: Esporta JSON (chi riceve e sceglie le foto)",
            variable=self.mode_var,
            value="1",
            command=self._switch_mode
        )
        rb1.pack(anchor="w", pady=2)

        rb2 = ttk.Radiobutton(
            mode_frame,
            text="Opzione 2: Elimina foto (chi ha la cartella originale)",
            variable=self.mode_var,
            value="2",
            command=self._switch_mode
        )
        rb2.pack(anchor="w", pady=2)

        # Contenitore dinamico delle opzioni
        self.container = tk.Frame(self, bg="#FFFFFF", padx=16, pady=16, highlightbackground="#E2E8F0", highlightthickness=1)
        self.container.pack(fill="both", expand=True, padx=24, pady=(0, 16))

        # Inizializza i pannelli
        self.panel1 = self._create_panel1(self.container)
        self.panel2 = self._create_panel2(self.container)

        self._switch_mode()

    def _switch_mode(self):
        if self.mode_var.get() == "1":
            self.panel2.pack_forget()
            self.panel1.pack(fill="both", expand=True)
        else:
            self.panel1.pack_forget()
            self.panel2.pack(fill="both", expand=True)

    # --- PANNELLO 1: ESPORTA JSON ---
    def _create_panel1(self, parent):
        frame = tk.Frame(parent, bg="#FFFFFF")

        tk.Label(
            frame,
            text="1. Seleziona la cartella con le foto rimaste:",
            font=("Segoe UI", 9, "bold"),
            bg="#FFFFFF",
            fg="#334155"
        ).pack(anchor="w", pady=(0, 4))

        row = tk.Frame(frame, bg="#FFFFFF")
        row.pack(fill="x", pady=(0, 12))

        self.p1_path_var = tk.StringVar()
        ttk.Entry(row, textvariable=self.p1_path_var).pack(side="left", fill="x", expand=True, padx=(0, 6))
        ttk.Button(row, text="Sfoglia...", command=self._p1_browse).pack(side="right")

        self.p1_status = tk.Label(frame, text="", font=("Segoe UI", 9), bg="#FFFFFF", fg="#64748B")
        self.p1_status.pack(anchor="w", pady=(0, 16))

        ttk.Button(
            frame,
            text="💾 Esporta 'foto_rimaste.json'",
            style="Action.TButton",
            command=self._p1_export
        ).pack(fill="x", ipady=4)

        return frame

    def _p1_browse(self):
        folder = filedialog.askdirectory(title="Seleziona la cartella foto")
        if folder:
            self.p1_path_var.set(folder)
            files = get_files(Path(folder))
            self.p1_status.config(text=f"Trovate {len(files)} foto nella cartella.", fg="#0284C7")

    def _p1_export(self):
        folder_str = self.p1_path_var.get().strip()
        if not folder_str or not Path(folder_str).is_dir():
            messagebox.showwarning("Attenzione", "Seleziona prima una cartella valida!")
            return

        folder = Path(folder_str)
        files = sorted(list(get_files(folder)))
        if not files:
            messagebox.showwarning("Attenzione", "La cartella è vuota!")
            return

        out = folder / "foto_rimaste.json"
        try:
            with open(out, "w", encoding="utf-8") as f:
                json.dump(files, f, indent=2, ensure_ascii=False)
            messagebox.showinfo("Fatto!", f"File salvato con successo:\n\n{out}\n\nInvialo a chi ti ha mandato le foto.")
        except Exception as e:
            messagebox.showerror("Errore", f"Impossibile salvare il file:\n{e}")

    # --- PANNELLO 2: ELIMINA FOTO ---
    def _create_panel2(self, parent):
        frame = tk.Frame(parent, bg="#FFFFFF")

        # Cartella originale
        tk.Label(frame, text="1. Cartella originale delle foto:", font=("Segoe UI", 9, "bold"), bg="#FFFFFF", fg="#334155").pack(anchor="w", pady=(0, 2))
        row1 = tk.Frame(frame, bg="#FFFFFF")
        row1.pack(fill="x", pady=(0, 10))
        self.p2_folder_var = tk.StringVar()
        ttk.Entry(row1, textvariable=self.p2_folder_var).pack(side="left", fill="x", expand=True, padx=(0, 6))
        ttk.Button(row1, text="Sfoglia...", command=self._p2_browse_folder).pack(side="right")

        # File JSON
        tk.Label(frame, text="2. File 'foto_rimaste.json':", font=("Segoe UI", 9, "bold"), bg="#FFFFFF", fg="#334155").pack(anchor="w", pady=(0, 2))
        row2 = tk.Frame(frame, bg="#FFFFFF")
        row2.pack(fill="x", pady=(0, 14))
        self.p2_json_var = tk.StringVar()
        ttk.Entry(row2, textvariable=self.p2_json_var).pack(side="left", fill="x", expand=True, padx=(0, 6))
        ttk.Button(row2, text="Sfoglia...", command=self._p2_browse_json).pack(side="right")

        # Pulsante Elimina
        ttk.Button(
            frame,
            text="🗑️ Elimina Foto Scartate",
            style="Delete.TButton",
            command=self._p2_delete
        ).pack(fill="x", ipady=4)

        return frame

    def _p2_browse_folder(self):
        folder = filedialog.askdirectory(title="Seleziona la tua cartella originale")
        if folder:
            self.p2_folder_var.set(folder)

    def _p2_browse_json(self):
        file_json = filedialog.askopenfilename(
            title="Seleziona il file JSON",
            filetypes=[("File JSON", "*.json"), ("Tutti i file", "*.*")]
        )
        if file_json:
            self.p2_json_var.set(file_json)

    def _p2_delete(self):
        folder_str = self.p2_folder_var.get().strip()
        json_str = self.p2_json_var.get().strip()

        if not folder_str or not Path(folder_str).is_dir():
            messagebox.showwarning("Attenzione", "Seleziona la cartella originale!")
            return

        if not json_str or not Path(json_str).is_file():
            messagebox.showwarning("Attenzione", "Seleziona il file JSON!")
            return

        try:
            with open(json_str, "r", encoding="utf-8") as f:
                kept = set(json.load(f))
        except Exception as e:
            messagebox.showerror("Errore", f"Impossibile leggere il file JSON:\n{e}")
            return

        folder = Path(folder_str)
        local = get_files(folder)
        to_delete = sorted(list(local - kept))

        if not to_delete:
            messagebox.showinfo("Nessuna Foto da Eliminare", "Tutte le foto nella tua cartella sono presenti nel file JSON!")
            return

        msg = f"Trovate {len(to_delete)} foto scartate (su {len(local)} totali).\n\nVuoi eliminarle definitivamente dalla cartella originale?"
        if not messagebox.askyesno("Conferma Eliminazione", msg, icon="warning"):
            return

        deleted = 0
        for rel in to_delete:
            target = folder / rel
            if target.exists():
                try:
                    os.remove(target)
                    deleted += 1
                except Exception as e:
                    print(f"Errore su {target}: {e}")

        messagebox.showinfo("Completato", f"{deleted} foto eliminate con successo!")


if __name__ == "__main__":
    app = App()
    app.mainloop()
