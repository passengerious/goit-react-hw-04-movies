import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTrendingMovies, POSTER_URL } from '../../services/movies-api';
import FilmPendingView from '../FilmPendingView';
import FilmErrorView from '../FilmErrorView';
import s from './HomePage.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomePage() {
  const { url } = useRouteMatch();
  const [films, setFilms] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchTrendingMovies()
      .then(request => setFilms(request.results))
      .then(setStatus(Status.RESOLVED))
      .catch(err => {
        setError(err);
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.PENDING) {
    return <FilmPendingView />;
  }

  if (status === Status.REJECTED) {
    return <FilmErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {films && (
          <>
            <p className={s.title}>Trending today</p>
            <ul className={s.list}>
              {films.map(film => (
                <>
                  {film.poster_path && (
                    <li key={film.id} className={s.item}>
                      <Link to={`${url}movies/${film.id}`} className={s.link}>
                        <img
                          className={s.image}
                          src={POSTER_URL + film.poster_path}
                          alt={film.title}
                          width="300"
                          height="450"
                        />
                        <p className={s.filmTitle}>{film.title}</p>
                      </Link>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
