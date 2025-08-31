import { useNavigate } from "react-router-dom";
import { PiUserCircleCheckFill, PiUsersThreeFill } from "react-icons/pi";
import { BsClipboardDataFill } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";
import BrutalButton from "../components/ui/BrutalButton";
import { appName } from "../constants";

export const LandingPage = () => {
  const navigate = useNavigate();

  const articles = [
    {
      title: "Gestión de Estudiantes",
      description:
        "Administre de manera más fácil la información y progreso de sus estudiantes",
      icon: PiUsersThreeFill,
    },
    {
      title: "Planificación",
      description: "Organice y planifique sus clases de manera eficiente",
      icon: BsClipboardDataFill,
    },
    {
      title: "Seguimiento de Progreso",
      description:
        "Realice un seguimiento detallado del progreso de sus estudiantes",
      icon: ImStatsDots,
    },
    {
      title: "Asistencias de Estudiantes",
      description: "Controle y registre la asistencia de sus estudiantes",
      icon: PiUserCircleCheckFill,
    },
  ];

  return (
    <main className="mt-10 flex-grow">
      <div className="flex flex-col items-center">
        <section className="text-center">
          <h1 className="text-4xl font-bold">Bienvenido a {appName}</h1>
          <h4>Plataforma para gestión de Docentes</h4>
        </section>

        <section className="mt-4 mb-10 w-32">
          <BrutalButton
            onClick={() => navigate("/auth/register")}
            className="w-full"
          >
            Unirse
          </BrutalButton>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-[858px]">
          {articles.map((article, index) => (
            <article
              key={index}
              className="flex flex-col items-center rounded-lg bg-[#D9D9D9] p-4 text-center ring-1"
            >
              <article.icon className="mb-2" size={40} />
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p>{article.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};
