import { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails, POSTER_URL } from '../../services/movies-api';
import Cast from '../Cast';
import Reviews from '../Reviews';
import FilmPendingView from '../FilmPendingView';

import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [film, setFilm] = useState({});
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setFilm);
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <div>
      <button onClick={handleGoBack} type="button" className={s.button}>
        Go back
      </button>
      <div className={s.wrapper}>
        <img
          className={s.image}
          src={POSTER_URL + film.poster_path}
          alt={film.title}
          widht="300"
          height="450"
        />
        <div className={s.rightPart}>
          <h2 className={s.title}>{film.title}</h2>
          <span className={s.subtitle}>Rating </span>
          <span>{film.vote_average}</span>
          <p className={s.subtitle}>Overview</p>
          <p>{film.overview}</p>

          {film.genres && (
            <>
              <p className={s.subtitle}>Genres</p>
              <ul className={s.list}>
                {film.genres.map((item, index) => (
                  <li key={index} className={s.item}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <nav className={s.nav}>
        <NavLink
          to={`${url}/cast`}
          className={s.link}
          activeClassName={s.activeLink}
        >
          Cast
        </NavLink>
        <NavLink
          to={`${url}/reviews`}
          className={s.link}
          activeClassName={s.activeLink}
        >
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={<FilmPendingView />}>
        <Switch>
          <Route path={`${path}:movieId/cast`}>
            <Cast movieId={movieId} />
          </Route>

          <Route path={`${path}:movieId/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
