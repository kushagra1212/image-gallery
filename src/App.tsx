import './App.css';
import { Header } from './containers/Header/Header';
import { Search } from './containers/Search/Search';
import { Cards } from './containers/Cards/Cards';
import { useContext, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ThemeContext } from './Context/ThemeProvider';

function App() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const isDarkMode = useContext(ThemeContext).currentThemeType === 'dark';

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeQuery = (query: string) => {
    setPage(1);
    setQuery(query);
  };

  const handleResetQuery = () => {
    setQuery('');
    setPage(1);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Header>
        <SearchBar query={query} handleChangeQuery={handleChangeQuery} handleResetQuery={handleResetQuery} />
      </Header>
      <Search>
        <SearchBar query={query} handleChangeQuery={handleChangeQuery} handleResetQuery={handleResetQuery} />
      </Search>
      <Cards page={page} handleChangePage={handleChangePage} query={query} />
    </div>
  );
}

export default App;
