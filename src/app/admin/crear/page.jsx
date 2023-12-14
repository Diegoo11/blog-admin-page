/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useQuill } from 'react-quilljs';
import { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import {
  Input, Button, Textarea, RadioGroup, Radio,
} from '@nextui-org/react';
import Title from '../../components/Home/Title';
import { useUtils } from '../../providers/UtilContext';
import ImageInput from '../ImageInput';
import PdfInput from '../PdfInput';

export default function Crear() {
  const { toast } = useUtils();

  const { quill, quillRef } = useQuill();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');

  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handdleSubmit = async (e) => {
    e.preventDefault();

    const formToImage = new FormData();
    formToImage.append('file', image);
    formToImage.append('upload_preset', 'blog-project');

    let formsToPdf = [];
    pdf.forEach((p) => {
      const formToPdf = new FormData();
      formToPdf.append('upload_preset', 'blog-project');
      formToPdf.append('file', p);
      formsToPdf.push(formToPdf);
    });

    setLoading(true);
    try {
      const resToImage = fetch('https://api.cloudinary.com/v1_1/dux0sb99g/upload', {
        method: 'POST',
        body: formToImage,
      }).then((res) => res.json());

      formsToPdf = pdf.length && formsToPdf.map((form) => fetch('https://api.cloudinary.com/v1_1/dux0sb99g/upload', {
        method: 'POST',
        body: form,
      }).then((res) => res.json()));

      const [resImage, resPdf] = await Promise.all([resToImage, Promise.all(formsToPdf)]);

      await fetch('/api/article/add', {
        method: 'POST',
        body: JSON.stringify({
          title,
          author,
          description,
          content,
          type,
          image: resImage.secure_url,
          pdf: pdf.length && resPdf.map((p) => p.secure_url),
        }),
      });
      toast.success('Articulo creado con exito');
      location.replace('/admin');

      setLoading(false);
    } catch (error) {
      toast.error('Error del servidor al crear el articulo');
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
        <ImageInput setImage={setImage} />
        <PdfInput setPdf={setPdf} pdf={pdf} />
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
