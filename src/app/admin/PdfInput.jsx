'use client';

export default function PdfInput({ setPdf, pdf }) {
  return (
    <div className="flex justify-start items-start gap-4 flex-col">
      <label
        htmlFor="pdf"
        form="pdf"
        className="flex justify-start items-start gap-2 flex-col"
      >
        <span>PDF</span>
        <input
          name="pdf"
          id="pdf"
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => {
            const pdfs = [];
            for (let i = 0; i < e.target.files.length; i += 1) {
              pdfs.push(e.target.files[i]);
            }
            setPdf(pdfs);
          }}
        />
      </label>
      <div className="ml-4">
        {
          pdf.map((p) => (
            <div key={p.name} className="flex items-center justify-start gap-1">
              <svg class="icon icon-tabler icon-tabler-file-text text-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M9 9l1 0" />
                <path d="M9 13l6 0" />
                <path d="M9 17l6 0" />
              </svg>
              <span>{p.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
