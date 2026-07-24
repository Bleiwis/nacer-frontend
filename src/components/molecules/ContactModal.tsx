'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../atoms/Dialog';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import {
  contactFormSchema,
  ContactFormData,
} from '@/schemas/contact.schema';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  recipientEmail,
}) => {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Abrir mailto nativo con el correo del desarrollador
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      data.subject,
    )}&body=${encodeURIComponent(data.message)}`;
    window.location.href = mailtoUrl;

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      reset();
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#0f131c] border-[#30363D]/60 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Enviar Mensaje</DialogTitle>
          <DialogDescription className="text-[#cbc3d7] text-xs">
            Escribe tu mensaje a <span className="text-[#8B5CF6] font-semibold">{recipientEmail}</span>.
          </DialogDescription>
        </DialogHeader>

        {isSent ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#91db2a] animate-bounce" />
            <p className="text-white font-bold">¡Mensaje Preparado!</p>
            <p className="text-[#cbc3d7] text-xs">
              Se ha abierto tu cliente de correo para enviar la conversación.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs text-[#cbc3d7] font-medium">Asunto</label>
              <Input
                {...register('subject')}
                placeholder="Ej. Oportunidad laboral / Consulta técnica"
              />
              {errors.subject && (
                <p className="text-xs text-[#ffb4ab]">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#cbc3d7] font-medium">Mensaje</label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Hola Leiwis, me gustaría contactarte sobre..."
                className="w-full rounded-lg border border-[#30363D]/40 bg-[#181b25] px-3 py-2 text-sm text-white placeholder:text-[#cbc3d7]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6]"
              />
              {errors.message && (
                <p className="text-xs text-[#ffb4ab]">{errors.message.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="glass" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="gradient">
                <Send className="w-4 h-4" /> Enviar Correo
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
