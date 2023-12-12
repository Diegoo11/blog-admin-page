'use client';

import { useQuill } from 'react-quilljs';
import { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import {
  Input, Button, Textarea, RadioGroup, Radio,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function EditForm({
  titleProp, authorProp, descriptionProp, contentProp, typeProp, id,
}) {
  const router = useRouter();

  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState(titleProp);
  const [author, setAuthor] = useState(authorProp);
  const [description, setDescription] = useState(descriptionProp);
  const [content, setContent] = useState(contentProp);
  const [type, setType] = useState(typeProp);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(contentProp);
      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill, contentProp]);

  const handdleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      fetch('/api/article/edit', {
        method: 'POST',
        body: JSON.stringify({
          title,
          author,
          description,
          content,
          type,
          id,
        }),
      });
      router.push('/admin');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handdleSubmit} className="py-8 flex flex-col gap-6">
      <Input
        size="lg"
        type="text"
        value={title}
        onValueChange={setTitle}
        label="Titulo"
        labelPlacement="outside"
        placeholder="Agrega tu titulo"
      />
      <Input
        size="lg"
        type="text"
        label="Autor"
        value={author}
        onValueChange={setAuthor}
        labelPlacement="outside"
        placeholder="Agrega al autor"
      />
      <RadioGroup
        label="Selecciona el tipo de articulo"
        onValueChange={setType}
        value={type}
      >
        <Radio value="Front End">Front End</Radio>
        <Radio value="Back End">Back End</Radio>
        <Radio value="JavaScript">JavaScript</Radio>
        <Radio value="Python">Python</Radio>
        <Radio value="Full Stack">Full Stack</Radio>
      </RadioGroup>
      <Textarea
        size="lg"
        type="text"
        value={description}
        onValueChange={setDescription}
        label="Descripcion, preview o resumen"
        labelPlacement="outside"
        placeholder="Agrega un resumen"
      />
      <div className="flex flex-col gap-2">
        <span>
          Contenido
        </span>
        <div style={{ all: 'initial', width: '100%', height: 500 }}>
          <div ref={quillRef} />
        </div>
      </div>
      <div className="w-full p-10 flex justify-end items-center ">
        <Button type="submit" isLoading={loading}>
          Crear
        </Button>
      </div>
    </form>
  );
}
