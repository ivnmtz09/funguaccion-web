"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Heart,
  Music,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Target,
  Eye,
  Award,
  HandHeart,
  Building,
  Bike,
  Calendar,
  User,
  ArrowRight,
} from "lucide-react";
import Navigation from "../components/Navigation.jsx";
import logo from "../assets/logo.png";

export default function Home() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const lineasAccion = [
    {
      id: "desarrollo-social",
      title: "Desarrollo Social, Económico y Comunitario",
      icon: <Users className="w-6 h-6" />,
      description: "Programas integrales para el fortalecimiento comunitario",
      items: [
        "Educación, salud, nutrición, vivienda y saneamiento básico",
        "Capacitación, formación y fortalecimiento institucional",
        "Desarrollo urbano y rural sostenible",
      ],
    },
    {
      id: "musica",
      title: "Música para el Desarrollo Social",
      icon: <Music className="w-6 h-6" />,
      description: "Transformación social a través del arte y la música",
      items: [
        "Escuelas musicales comunitarias",
        "Festivales y programas de inclusión",
        "Emprendimiento musical y apoyo a talentos locales",
      ],
    },
    {
      id: "innovacion",
      title: "Innovación y Tecnología para el Cambio Social",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Soluciones tecnológicas para el desarrollo territorial",
      items: [
        "Laboratorios de innovación social",
        "Alfabetización digital y tecnología solar",
        "Apoyo a emprendimientos tecnológicos rurales",
      ],
    },
    {
      id: "movilidad",
      title: "Movilidad Sostenible y Economía Verde",
      icon: <Bike className="w-6 h-6" />,
      description: "Transporte ecológico y desarrollo sostenible",
      items: [
        "Triciclos solares para transporte comunitario",
        "Turismo verde con enfoque Wayuu",
        "Educación ambiental y transición energética",
      ],
    },
    {
      id: "gestion",
      title: "Gestión del Conocimiento y Planeación Estratégica",
      icon: <Target className="w-6 h-6" />,
      description: "Fortalecimiento institucional y territorial",
      items: [
        "Planes de desarrollo y de acción climática",
        "Observatorios e investigaciones sociales",
      ],
    },
  ];

  const valores = [
    { name: "Compromiso Social", icon: <Users className="w-6 h-6" /> },
    { name: "Servicio", icon: <HandHeart className="w-6 h-6" /> },
    { name: "Solidaridad", icon: <Heart className="w-6 h-6" /> },
    { name: "Transparencia", icon: <Eye className="w-6 h-6" /> },
    { name: "Respeto", icon: <Award className="w-6 h-6" /> },
  ];

  return (
    <div className="mobile-container bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col relative overflow-hidden">
      <Navigation currentPage="inicio" />

      <section className="flex flex-col items-center text-center py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            <span className="gradient-text">Fundación Guajira en Acción</span>
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed mb-6">
            Somos una organización social comprometida con el desarrollo ambiental, económico, social, cultural y político de Colombia, especialmente de La Guajira.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/nosotros" className="btn-primary px-8 py-3 text-lg">
              Conoce más sobre nosotros
            </Link>
            <Link to="/programas" className="text-green-700 hover:underline font-semibold">
              Ver nuestros programas →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/60 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold gradient-text mb-8">
            Nuestras Líneas de Acción
          </h2>
          <div className="space-y-6">
            {lineasAccion.map((linea) => (
              <div key={linea.id} className="card">
                <button
                  onClick={() => toggleSection(linea.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      {linea.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-900">
                        {linea.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{linea.description}</p>
                    </div>
                  </div>
                  {expandedSection === linea.id ? (
                    <ChevronUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-green-600" />
                  )}
                </button>

                {expandedSection === linea.id && (
                  <ul className="mt-4 space-y-2">
                    {linea.items.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold gradient-text mb-8">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {valores.map((valor, i) => (
              <div key={i} className="card text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  {valor.icon}
                </div>
                <h3 className="text-lg font-semibold text-green-900">{valor.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
