import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="font-display text-7xl text-foreground/20">404</h1>
        <h2 className="font-display text-3xl">Страница не найдена</h2>
        <p className="text-foreground/60 font-light">
          Такой страницы в PSYTY нет. Вернитесь на главную или напишите нам через форму контактов.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="px-6 py-3 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase">
            На главную
          </Link>
          <Link to="/contact" className="px-6 py-3 border border-foreground text-foreground text-[12px] tracking-[0.18em] uppercase">
            Контакты
          </Link>
        </div>
      </div>
    </div>
  );
}
