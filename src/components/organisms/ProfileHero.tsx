'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/schemas/user.schema';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';
import { ContactModal } from '../molecules/ContactModal';
import {
  Mail,
  Building,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Share2,
} from 'lucide-react';

interface ProfileHeroProps {
  user: UserProfile;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ user }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="glass rounded-xl overflow-hidden relative group">
        <div
          className="h-48 w-full relative"
          style={{
            background:
              'linear-gradient(135deg, #5516be 0%, #a078ff 50%, #ee9800 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        <div className="px-6 pb-6 flex flex-col items-center text-center md:items-end md:text-left md:flex-row gap-4 -mt-16 relative z-10">
          <Avatar
            src={user.avatarUrl}
            alt={user.name || user.username}
            size="xl"
            className="border-4 border-[#0a0e17] shadow-xl w-32 h-32 shrink-0 rounded-full"
          />
          <div className="flex-1 pb-2 w-full">
            <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row md:justify-between gap-4">
              <div>
                <h1 className="text-3xl text-white font-extrabold tracking-tight">
                  {user.name || user.username}
                </h1>
                <p className="text-[#cbc3d7] font-mono text-sm mt-0.5">
                  @{user.username}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                {/* Botón Mensaje abriendo modal Mailto */}
                <Button variant="gradient" onClick={() => setIsContactOpen(true)}>
                  <Mail className="w-4 h-4 text-white" />
                  Mensaje
                </Button>

                {/* Redirección a LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/leiwisbernal"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="glass" className="hover:text-[#0077b5]">
                    <Share2 className="w-4 h-4 text-[#0077b5]" />
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-[#30363D]/40">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-[#cbc3d7] text-sm leading-relaxed">
                {user.bio ||
                  'Arquitecto Full-Stack especializado en sistemas distribuidos y rendimiento en la nube.'}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#cbc3d7] text-xs">
                <Building className="w-4 h-4 text-[#cbc3d7]" />
                <span>{user.company || 'Amaris Consulting'}</span>
              </div>
              <div className="flex items-center gap-2 text-[#cbc3d7] text-xs">
                <MapPin className="w-4 h-4 text-[#cbc3d7]" />
                <span>{user.location || 'Bogotá, Colombia'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#cbc3d7] text-xs">
                <LinkIcon className="w-4 h-4 text-[#cbc3d7]" />
                <a
                  className="text-[#d0bcff] hover:underline truncate"
                  href={user.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Perfil de GitHub
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#cbc3d7] text-xs">
                <Calendar className="w-4 h-4 text-[#cbc3d7]" />
                <span>Registrado en Feb 2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Contacto Mailto */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        recipientEmail="leiwisbernal@gmail.com"
      />
    </>
  );
};
