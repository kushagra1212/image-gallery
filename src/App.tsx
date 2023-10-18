import './App.css';
import { Header } from './containers/Header/Header';
import { Search } from './containers/Search/Search';
import { useContext, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ThemeContext } from './Context/ThemeProvider';
import Cards from './containers/Cards/Cards';

function App() {
  // State variables
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');

  // Theme context
  const isDarkMode = useContext(ThemeContext).currentThemeType === 'dark';

  // Event handlers
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
      {/* Header */}
      <Header>
        <SearchBar query={query} handleChangeQuery={handleChangeQuery} handleResetQuery={handleResetQuery} />
      </Header>

      {/* Search */}
      <Search>
        <SearchBar query={query} handleChangeQuery={handleChangeQuery} handleResetQuery={handleResetQuery} />
      </Search>

      {/* Cards */}
      <Cards page={page} handleChangePage={handleChangePage} query={query} />
    </div>
  );
}

export default App;
