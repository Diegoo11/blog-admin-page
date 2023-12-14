'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Modal, Button, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import formatDate from '@/utils/formatDate';
import { useUtils } from '@/app/providers/UtilContext';

export default function DeleteButton({
  title, description, image, author, date, id,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { toast } = useUtils();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handdleClick = async (onClose) => {
    setLoading(true);
    try {
      fetch('/api/article/delete', {
        method: 'POST',
        body: JSON.stringify({
          id,
        }),
      });
      toast.success('Articulo editado con exito');
      setLoading(false);
      onClose();
      router.refresh({ revalidate: 0 });
    } catch (error) {
      toast.error('Error del servidor al eliminar el articulo');
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="text-[#6f7175] hover:text-black text-base"
      >
        Eliminar
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Eliminar articulo</ModalHeader>
              <ModalBody>
                <span className="font-bold text-lg">
                  ¿Estas seguro de eliminar el articulo?
                </span>
                <span>
                  Si eliminas el articulo no podras recuperarlo
                </span>
                <span className="font-bold text-lg">
                  Previsulizacion del articulo
                </span>
                <article className="flex flex-col gap-2">
                  <header className="flex gap-2 text-sm flex-wrap">
                    <Image
                      width={20}
                      height={20}
                      src="/images/userExample.jpg"
                      alt="User Example"
                      className="rounded-full"
                    />
                    <span>
                      {author}
                    </span>
                    <span className="">·</span>
                    <span>
                      {formatDate(date)}
                    </span>
                  </header>
                  <main>
                    <h1 className="font-black text-2xl">
                      {title}
                    </h1>
                    <p>
                      {description}
                    </p>
                  </main>
                  <div className="flex justify-center items-center">
                    <Image
                      width={120}
                      height={120}
                      src={image}
                      alt={title}
                    />
                  </div>
                </article>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" isLoading={loading} onClick={() => handdleClick(onClose)}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
