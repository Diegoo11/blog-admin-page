/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useQuill } from 'react-quilljs';
import { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import {
  Input, Button, Textarea, RadioGroup, Radio,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Title from '../../components/Home/Title';

export default function Crear() {
  const router = useRouter();

  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handdleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      fetch('/api/article/add', {
        method: 'POST',
        body: JSON.stringify({
          title,
          author,
          description,
          content,
          type,
        }),
      });
      router.push('/admin');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full px-6">
      <Title text="CREAR ARTICULO" />
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
    </div>
  );
}
