import React, { useState, useEffect } from 'react';
import { Search, Trophy, Globe, Calendar, AlertCircle, CheckCircle, XCircle, Star, Filter, User, Award } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState('en');
  const [gameState, setGameState] = useState('language');
  const [username, setUsername] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [useFilters, setUseFilters] = useState({
    period: false,
    continent: false,
    league: false
  });
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(20);
  const [finalGuess, setFinalGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);

  useEffect(() => {
    const savedScores = localStorage.getItem('footballQuizHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const translations = {
    en: {
      title: "Football Player 20 Questions",
      subtitle: "I'm thinking of a football player. Ask yes/no questions to guess who it is!",
      selectLanguage: "Select Language",
      enterUsername: "Enter Your Name",
      usernamePlaceholder: "Your name...",
      continue: "Continue",
      selectPeriod: "Select Birth Period",
      selectContinent: "Select Birth Continent",
      selectLeague: "Select League (Optional)",
      useFiltersTitle: "Difficulty Settings",
      useFiltersDesc: "Enable filters to make the game easier (reduces your score)",
      usePeriodFilter: "Use Birth Period Filter",
      useContinentFilter: "Use Birth Continent Filter",
      useLeagueFilter: "Use League Filter",
      startGame: "Start Game",
      questionsLeft: "questions left",
      validQuestions: "valid questions",
      restart: "Restart",
      hint: "Hint:",
      playerFrom: "The player is from",
      playedAs: "and played as a",
      bornIn: "born in",
      readyToGuess: "Ready to guess?",
      enterPlayerName: "Enter the player's name...",
      submitGuess: "Submit Guess",
      congratulations: "Congratulations!",
      youGuessed: "You correctly guessed",
      gameOver: "Game Over!",
      playerWas: "The player was",
      playerDetails: "Player Details:",
      country: "Country:",
      position: "Position:",
      clubs: "Clubs:",
      leagues: "Leagues:",
      birthYear: "Birth Year:",
      worldCup: "World Cup Winner:",
      ballonDor: "Ballon d'Or Winner:",
      height: "Height:",
      appearance: "Appearance:",
      yes: "Yes",
      no: "No",
      notCounted: "Not counted",
      questionsUsed: "Valid questions used:",
      finalScore: "Final Score:",
      playAgain: "Play Again",
      viewHighScores: "View High Scores",
      hideHighScores: "Hide High Scores",
      highScoresTitle: "🏆 High Scores",
      noScoresYet: "No high scores yet. Be the first!",
      askQuestion: "Ask a yes/no question...",
      asking: "Ask",
      checking: "Checking...",
      tipsTitle: "Tips for asking questions:",
      tip1: "Ask about position (forward, midfielder, defender)",
      tip2: "Ask about clubs and leagues",
      tip3: "Ask about achievements (World Cup, Ballon d'Or)",
      tip4: "Ask about appearance (height, hair, beard)",
      tip5: "Ask about birth year (born before/after XXXX)",
      scoreBreakdown: "Score Breakdown:",
      baseScore: "Base Score:",
      questionPenalty: "Question Penalty:",
      filterPenalty: "Filter Penalty:",
      bonusPoints: "Early Guess Bonus:",
      cm: "cm",
      rank: "Rank",
      player: "Player",
      points: "Points"
    },
    no: {
      title: "Fotballspiller 20 Spørsmål",
      subtitle: "Jeg tenker på en fotballspiller. Still ja/nei-spørsmål for å gjette hvem det er!",
      selectLanguage: "Velg Språk",
      enterUsername: "Skriv inn navnet ditt",
      usernamePlaceholder: "Ditt navn...",
      continue: "Fortsett",
      selectPeriod: "Velg Fødselsperiode",
      selectContinent: "Velg Fødekontinent",
      selectLeague: "Velg Liga (Valgfritt)",
      useFiltersTitle: "Vanskelighetsgrad",
      useFiltersDesc: "Aktiver filtre for å gjøre spillet enklere (reduserer poengsummen din)",
      usePeriodFilter: "Bruk Fødselsperiode-filter",
      useContinentFilter: "Bruk Fødekontinent-filter",
      useLeagueFilter: "Bruk Liga-filter",
      startGame: "Start Spill",
      questionsLeft: "spørsmål igjen",
      validQuestions: "gyldige spørsmål",
      restart: "Start på nytt",
      hint: "Hint:",
      playerFrom: "Spilleren er fra",
      playedAs: "og spilte som",
      bornIn: "født i",
      readyToGuess: "Klar til å gjette?",
      enterPlayerName: "Skriv inn spillerens navn...",
      submitGuess: "Send inn gjetning",
      congratulations: "Gratulerer!",
      youGuessed: "Du gjettet riktig",
      gameOver: "Spillet er over!",
      playerWas: "Spilleren var",
      playerDetails: "Spillerdetaljer:",
      country: "Land:",
      position: "Posisjon:",
      clubs: "Klubber:",
      leagues: "Ligaer:",
      birthYear: "Fødselsår:",
      worldCup: "VM-vinner:",
      ballonDor: "Ballon d'Or-vinner:",
      height: "Høyde:",
      appearance: "Utseende:",
      yes: "Ja",
      no: "Nei",
      notCounted: "Teller ikke",
      questionsUsed: "Gyldige spørsmål brukt:",
      finalScore: "Sluttpoeng:",
      playAgain: "Spill igjen",
      viewHighScores: "Vis toppliste",
      hideHighScores: "Skjul toppliste",
      highScoresTitle: "🏆 Toppliste",
      noScoresYet: "Ingen på topplisten ennå. Vær den første!",
      askQuestion: "Still et ja/nei-spørsmål...",
      asking: "Still spørsmål",
      checking: "Sjekker...",
      tipsTitle: "Tips til spørsmål:",
      tip1: "Spør om posisjon (spiss, midtbane, forsvar)",
      tip2: "Spør om klubber og ligaer",
      tip3: "Spør om prestasjoner (VM, Ballon d'Or)",
      tip4: "Spør om utseende (høyde, hår, skjegg)",
      tip5: "Spør om fødselsår (født før/etter XXXX)",
      scoreBreakdown: "Poengfordeling:",
      baseScore: "Grunnpoeng:",
      questionPenalty: "Spørsmålstrekk:",
      filterPenalty: "Filtertrekk:",
      bonusPoints: "Tidlig gjetting bonus:",
      cm: "cm",
      rank: "Plass",
      player: "Spiller",
      points: "Poeng"
    }
  };

  const t = translations[language];

  const periods = [
    { id: '1950-1960', label: language === 'no' ? 'Født 1950-60' : 'Born 1950-60' },
    { id: '1960-1970', label: language === 'no' ? 'Født 1960-70' : 'Born 1960-70' },
    { id: '1970-1980', label: language === 'no' ? 'Født 1970-80' : 'Born 1970-80' },
    { id: '1980-1990', label: language === 'no' ? 'Født 1980-90' : 'Born 1980-90' },
    { id: '1990-2000', label: language === 'no' ? 'Født 1990-00' : 'Born 1990-00' },
    { id: '2000-2010', label: language === 'no' ? 'Født 2000-10' : 'Born 2000-10' }
  ];

  const continents = [
    { id: 'europe', label: language === 'no' ? 'Europa' : 'Europe' },
    { id: 'south-america', label: language === 'no' ? 'Sør-Amerika' : 'South America' },
    { id: 'africa', label: language === 'no' ? 'Afrika' : 'Africa' },
    { id: 'asia', label: language === 'no' ? 'Asia' : 'Asia' },
    { id: 'north-america', label: language === 'no' ? 'Nord-Amerika' : 'North America' }
  ];

  const leagues = [
    { id: 'premier-league', label: 'Premier League' },
    { id: 'la-liga', label: 'La Liga' },
    { id: 'serie-a', label: 'Serie A' },
    { id: 'bundesliga', label: 'Bundesliga' },
    { id: 'ligue-1', label: 'Ligue 1' }
  ];

  // Spillere organisert etter FØDEKONTINENT og FØDSELSÅR
  const playerDatabase = {
    europe: {
      '1950-1960': [
        { name: 'Diego Maradona', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'Napoli'], birthYear: 1960, worldCup: true, ballon: true, leagues: ['La Liga', 'Serie A'], height: 165, hair: 'dark', beard: false },
        { name: 'Michel Platini', country: 'France', continent: 'europe', position: 'Midfielder', clubs: ['Juventus'], birthYear: 1955, worldCup: false, ballon: true, leagues: ['Serie A'], height: 178, hair: 'dark', beard: false },
        { name: 'Karl-Heinz Rummenigge', country: 'Germany', continent: 'europe', position: 'Forward', clubs: ['Bayern Munich', 'Inter Milan'], birthYear: 1955, worldCup: false, ballon: true, leagues: ['Bundesliga', 'Serie A'], height: 182, hair: 'dark', beard: false },
        { name: 'Paolo Rossi', country: 'Italy', continent: 'europe', position: 'Forward', clubs: ['Juventus', 'AC Milan'], birthYear: 1956, worldCup: true, ballon: true, leagues: ['Serie A'], height: 173, hair: 'dark', beard: false },
        { name: 'Zbigniew Boniek', country: 'Poland', continent: 'europe', position: 'Midfielder', clubs: ['Juventus', 'Roma'], birthYear: 1956, worldCup: false, ballon: false, leagues: ['Serie A'], height: 175, hair: 'dark', beard: false },
        { name: 'Jean Tigana', country: 'France', continent: 'europe', position: 'Midfielder', clubs: ['Bordeaux'], birthYear: 1955, worldCup: false, ballon: false, leagues: ['Ligue 1'], height: 174, hair: 'dark', beard: false },
        { name: 'Kenny Dalglish', country: 'Scotland', continent: 'europe', position: 'Forward', clubs: ['Liverpool', 'Celtic'], birthYear: 1951, worldCup: false, ballon: false, leagues: ['Premier League'], height: 173, hair: 'dark', beard: false },
        { name: 'Kevin Keegan', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Liverpool', 'Hamburg'], birthYear: 1951, worldCup: false, ballon: true, leagues: ['Premier League', 'Bundesliga'], height: 173, hair: 'dark', beard: false },
        { name: 'Bryan Robson', country: 'England', continent: 'europe', position: 'Midfielder', clubs: ['Manchester United'], birthYear: 1957, worldCup: false, ballon: false, leagues: ['Premier League'], height: 180, hair: 'dark', beard: false },
        { name: 'Preben Elkjær', country: 'Denmark', continent: 'europe', position: 'Forward', clubs: ['Verona'], birthYear: 1957, worldCup: false, ballon: false, leagues: ['Serie A'], height: 180, hair: 'dark', beard: false },
        { name: 'Igor Belanov', country: 'Ukraine', continent: 'europe', position: 'Forward', clubs: ['Dynamo Kyiv'], birthYear: 1960, worldCup: false, ballon: true, leagues: [], height: 179, hair: 'dark', beard: false }
      ],
      '1960-1970': [
        { name: 'Ruud Gullit', country: 'Netherlands', continent: 'europe', position: 'Midfielder', clubs: ['AC Milan', 'Chelsea'], birthYear: 1962, worldCup: false, ballon: true, leagues: ['Serie A', 'Premier League'], height: 191, hair: 'dark', beard: false },
        { name: 'Marco van Basten', country: 'Netherlands', continent: 'europe', position: 'Forward', clubs: ['Ajax', 'AC Milan'], birthYear: 1964, worldCup: false, ballon: true, leagues: ['Serie A'], height: 188, hair: 'blonde', beard: false },
        { name: 'Frank Rijkaard', country: 'Netherlands', continent: 'europe', position: 'Midfielder', clubs: ['AC Milan', 'Ajax'], birthYear: 1962, worldCup: false, ballon: false, leagues: ['Serie A'], height: 190, hair: 'dark', beard: false },
        { name: 'Roberto Baggio', country: 'Italy', continent: 'europe', position: 'Forward', clubs: ['Juventus', 'AC Milan'], birthYear: 1967, worldCup: false, ballon: true, leagues: ['Serie A'], height: 174, hair: 'dark', beard: false },
        { name: 'Lothar Matthäus', country: 'Germany', continent: 'europe', position: 'Midfielder', clubs: ['Bayern Munich', 'Inter Milan'], birthYear: 1961, worldCup: true, ballon: true, leagues: ['Bundesliga', 'Serie A'], height: 174, hair: 'dark', beard: false },
        { name: 'Gary Lineker', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Barcelona', 'Tottenham'], birthYear: 1960, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 175, hair: 'dark', beard: false },
        { name: 'Jean-Pierre Papin', country: 'France', continent: 'europe', position: 'Forward', clubs: ['Marseille', 'AC Milan'], birthYear: 1963, worldCup: false, ballon: true, leagues: ['Ligue 1', 'Serie A'], height: 173, hair: 'dark', beard: false },
        { name: 'Matthias Sammer', country: 'Germany', continent: 'europe', position: 'Defender', clubs: ['Borussia Dortmund', 'Inter Milan'], birthYear: 1967, worldCup: false, ballon: true, leagues: ['Bundesliga', 'Serie A'], height: 182, hair: 'blonde', beard: false },
        { name: 'Hristo Stoichkov', country: 'Bulgaria', continent: 'europe', position: 'Forward', clubs: ['Barcelona'], birthYear: 1966, worldCup: false, ballon: true, leagues: ['La Liga'], height: 178, hair: 'dark', beard: false },
        { name: 'Paul Gascoigne', country: 'England', continent: 'europe', position: 'Midfielder', clubs: ['Tottenham', 'Lazio'], birthYear: 1967, worldCup: false, ballon: false, leagues: ['Premier League', 'Serie A'], height: 178, hair: 'dark', beard: false },
        { name: 'Alan Shearer', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Newcastle United', 'Blackburn Rovers'], birthYear: 1970, worldCup: false, ballon: false, leagues: ['Premier League'], height: 180, hair: 'dark', beard: false }
      ],
      '1970-1980': [
        { name: 'Zinedine Zidane', country: 'France', continent: 'europe', position: 'Midfielder', clubs: ['Juventus', 'Real Madrid'], birthYear: 1972, worldCup: true, ballon: true, leagues: ['Serie A', 'La Liga'], height: 185, hair: 'bald', beard: false },
        { name: 'Thierry Henry', country: 'France', continent: 'europe', position: 'Forward', clubs: ['Arsenal', 'Barcelona'], birthYear: 1977, worldCup: true, ballon: false, leagues: ['Premier League', 'La Liga'], height: 188, hair: 'dark', beard: false },
        { name: 'Pavel Nedvěd', country: 'Czech Republic', continent: 'europe', position: 'Midfielder', clubs: ['Juventus', 'Lazio'], birthYear: 1972, worldCup: false, ballon: true, leagues: ['Serie A'], height: 177, hair: 'blonde', beard: false },
        { name: 'Raúl', country: 'Spain', continent: 'europe', position: 'Forward', clubs: ['Real Madrid'], birthYear: 1977, worldCup: false, ballon: false, leagues: ['La Liga'], height: 180, hair: 'dark', beard: false },
        { name: 'Andriy Shevchenko', country: 'Ukraine', continent: 'europe', position: 'Forward', clubs: ['AC Milan', 'Chelsea'], birthYear: 1976, worldCup: false, ballon: true, leagues: ['Serie A', 'Premier League'], height: 183, hair: 'dark', beard: false },
        { name: 'Michael Owen', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Liverpool', 'Real Madrid'], birthYear: 1979, worldCup: false, ballon: true, leagues: ['Premier League', 'La Liga'], height: 173, hair: 'dark', beard: false },
        { name: 'Francesco Totti', country: 'Italy', continent: 'europe', position: 'Forward', clubs: ['Roma'], birthYear: 1976, worldCup: true, ballon: false, leagues: ['Serie A'], height: 180, hair: 'dark', beard: false },
        { name: 'Didier Drogba', country: 'Ivory Coast', continent: 'africa', position: 'Forward', clubs: ['Chelsea'], birthYear: 1978, worldCup: false, ballon: false, leagues: ['Premier League'], height: 188, hair: 'bald', beard: false },
        { name: 'Andrea Pirlo', country: 'Italy', continent: 'europe', position: 'Midfielder', clubs: ['AC Milan', 'Juventus'], birthYear: 1979, worldCup: true, ballon: false, leagues: ['Serie A'], height: 177, hair: 'dark', beard: true },
        { name: 'Frank Lampard', country: 'England', continent: 'europe', position: 'Midfielder', clubs: ['Chelsea'], birthYear: 1978, worldCup: false, ballon: false, leagues: ['Premier League'], height: 184, hair: 'dark', beard: false },
        { name: 'Steven Gerrard', country: 'England', continent: 'europe', position: 'Midfielder', clubs: ['Liverpool'], birthYear: 1980, worldCup: false, ballon: false, leagues: ['Premier League'], height: 183, hair: 'dark', beard: false },
        { name: 'Xavi', country: 'Spain', continent: 'europe', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 1980, worldCup: true, ballon: false, leagues: ['La Liga'], height: 170, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Cristiano Ronaldo', country: 'Portugal', continent: 'europe', position: 'Forward', clubs: ['Manchester United', 'Real Madrid'], birthYear: 1985, worldCup: false, ballon: true, leagues: ['Premier League', 'La Liga'], height: 187, hair: 'dark', beard: false },
        { name: 'Kaká', country: 'Brazil', continent: 'south-america', position: 'Midfielder', clubs: ['AC Milan', 'Real Madrid'], birthYear: 1982, worldCup: true, ballon: true, leagues: ['Serie A', 'La Liga'], height: 186, hair: 'dark', beard: false },
        { name: 'Luka Modrić', country: 'Croatia', continent: 'europe', position: 'Midfielder', clubs: ['Tottenham', 'Real Madrid'], birthYear: 1985, worldCup: false, ballon: true, leagues: ['Premier League', 'La Liga'], height: 172, hair: 'light', beard: false },
        { name: 'Andrés Iniesta', country: 'Spain', continent: 'europe', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 1984, worldCup: true, ballon: false, leagues: ['La Liga'], height: 171, hair: 'dark', beard: false },
        { name: 'Sergio Ramos', country: 'Spain', continent: 'europe', position: 'Defender', clubs: ['Real Madrid', 'PSG'], birthYear: 1986, worldCup: true, ballon: false, leagues: ['La Liga', 'Ligue 1'], height: 184, hair: 'dark', beard: true },
        { name: 'Manuel Neuer', country: 'Germany', continent: 'europe', position: 'Goalkeeper', clubs: ['Bayern Munich'], birthYear: 1986, worldCup: true, ballon: false, leagues: ['Bundesliga'], height: 193, hair: 'blonde', beard: false },
        { name: 'Wayne Rooney', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Manchester United', 'Everton'], birthYear: 1985, worldCup: false, ballon: false, leagues: ['Premier League'], height: 176, hair: 'dark', beard: false },
        { name: 'Mesut Özil', country: 'Germany', continent: 'europe', position: 'Midfielder', clubs: ['Real Madrid', 'Arsenal'], birthYear: 1988, worldCup: true, ballon: false, leagues: ['La Liga', 'Premier League'], height: 180, hair: 'dark', beard: false },
        { name: 'Zlatan Ibrahimović', country: 'Sweden', continent: 'europe', position: 'Forward', clubs: ['Juventus', 'Barcelona', 'PSG', 'Manchester United'], birthYear: 1981, worldCup: false, ballon: false, leagues: ['Serie A', 'La Liga', 'Ligue 1', 'Premier League'], height: 195, hair: 'dark', beard: false },
        { name: 'Robert Lewandowski', country: 'Poland', continent: 'europe', position: 'Forward', clubs: ['Borussia Dortmund', 'Bayern Munich'], birthYear: 1988, worldCup: false, ballon: false, leagues: ['Bundesliga'], height: 185, hair: 'dark', beard: false },
        { name: 'Thomas Müller', country: 'Germany', continent: 'europe', position: 'Forward', clubs: ['Bayern Munich'], birthYear: 1989, worldCup: true, ballon: false, leagues: ['Bundesliga'], height: 186, hair: 'dark', beard: false },
        { name: 'Toni Kroos', country: 'Germany', continent: 'europe', position: 'Midfielder', clubs: ['Bayern Munich', 'Real Madrid'], birthYear: 1990, worldCup: true, ballon: false, leagues: ['Bundesliga', 'La Liga'], height: 183, hair: 'dark', beard: false },
        { name: 'Cesc Fàbregas', country: 'Spain', continent: 'europe', position: 'Midfielder', clubs: ['Arsenal', 'Barcelona', 'Chelsea'], birthYear: 1987, worldCup: true, ballon: false, leagues: ['Premier League', 'La Liga'], height: 175, hair: 'dark', beard: true },
        { name: 'Gerard Piqué', country: 'Spain', continent: 'europe', position: 'Defender', clubs: ['Barcelona', 'Manchester United'], birthYear: 1987, worldCup: true, ballon: false, leagues: ['La Liga', 'Premier League'], height: 194, hair: 'dark', beard: false },
        { name: 'David Silva', country: 'Spain', continent: 'europe', position: 'Midfielder', clubs: ['Manchester City'], birthYear: 1986, worldCup: true, ballon: false, leagues: ['Premier League'], height: 170, hair: 'dark', beard: true }
      ],
      '1990-2000': [
        { name: 'Kevin De Bruyne', country: 'Belgium', continent: 'europe', position: 'Midfielder', clubs: ['Manchester City'], birthYear: 1991, worldCup: false, ballon: false, leagues: ['Premier League'], height: 181, hair: 'ginger', beard: false },
        { name: 'Harry Kane', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Tottenham', 'Bayern Munich'], birthYear: 1993, worldCup: false, ballon: false, leagues: ['Premier League', 'Bundesliga'], height: 188, hair: 'dark', beard: false },
        { name: 'Kylian Mbappé', country: 'France', continent: 'europe', position: 'Forward', clubs: ['PSG', 'Real Madrid'], birthYear: 1998, worldCup: true, ballon: false, leagues: ['Ligue 1', 'La Liga'], height: 178, hair: 'dark', beard: false },
        { name: 'Martin Ødegaard', country: 'Norway', continent: 'europe', position: 'Midfielder', clubs: ['Real Madrid', 'Arsenal'], birthYear: 1998, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 178, hair: 'blonde', beard: true },
        { name: 'Thibaut Courtois', country: 'Belgium', continent: 'europe', position: 'Goalkeeper', clubs: ['Chelsea', 'Real Madrid'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['Premier League', 'La Liga'], height: 199, hair: 'dark', beard: false },
        { name: 'N\'Golo Kanté', country: 'France', continent: 'europe', position: 'Midfielder', clubs: ['Leicester City', 'Chelsea'], birthYear: 1991, worldCup: true, ballon: false, leagues: ['Premier League'], height: 168, hair: 'dark', beard: false },
        { name: 'Antoine Griezmann', country: 'France', continent: 'europe', position: 'Forward', clubs: ['Atletico Madrid', 'Barcelona'], birthYear: 1991, worldCup: true, ballon: false, leagues: ['La Liga'], height: 176, hair: 'blonde', beard: false },
        { name: 'Eden Hazard', country: 'Belgium', continent: 'europe', position: 'Forward', clubs: ['Chelsea', 'Real Madrid'], birthYear: 1991, worldCup: false, ballon: false, leagues: ['Premier League', 'La Liga'], height: 175, hair: 'dark', beard: false },
        { name: 'Jan Oblak', country: 'Slovenia', continent: 'europe', position: 'Goalkeeper', clubs: ['Atletico Madrid'], birthYear: 1993, worldCup: false, ballon: false, leagues: ['La Liga'], height: 188, hair: 'dark', beard: false },
        { name: 'Raheem Sterling', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Liverpool', 'Manchester City', 'Chelsea'], birthYear: 1994, worldCup: false, ballon: false, leagues: ['Premier League'], height: 170, hair: 'dark', beard: false },
        { name: 'Paul Pogba', country: 'France', continent: 'europe', position: 'Midfielder', clubs: ['Juventus', 'Manchester United'], birthYear: 1993, worldCup: true, ballon: false, leagues: ['Serie A', 'Premier League'], height: 191, hair: 'dark', beard: false },
        { name: 'Romelu Lukaku', country: 'Belgium', continent: 'europe', position: 'Forward', clubs: ['Chelsea', 'Inter Milan', 'Manchester United'], birthYear: 1993, worldCup: false, ballon: false, leagues: ['Premier League', 'Serie A'], height: 191, hair: 'dark', beard: false }
      ],
      '2000-2010': [
        { name: 'Erling Haaland', country: 'Norway', continent: 'europe', position: 'Forward', clubs: ['Borussia Dortmund', 'Manchester City'], birthYear: 2000, worldCup: false, ballon: false, leagues: ['Bundesliga', 'Premier League'], height: 194, hair: 'blonde', beard: false },
        { name: 'Jude Bellingham', country: 'England', continent: 'europe', position: 'Midfielder', clubs: ['Borussia Dortmund', 'Real Madrid'], birthYear: 2003, worldCup: false, ballon: false, leagues: ['Bundesliga', 'La Liga'], height: 186, hair: 'dark', beard: false },
        { name: 'Phil Foden', country: 'England', continent: 'europe', position: 'Midfielder', clubs: ['Manchester City'], birthYear: 2000, worldCup: false, ballon: false, leagues: ['Premier League'], height: 171, hair: 'blonde', beard: false },
        { name: 'Jamal Musiala', country: 'Germany', continent: 'europe', position: 'Midfielder', clubs: ['Bayern Munich'], birthYear: 2003, worldCup: false, ballon: false, leagues: ['Bundesliga'], height: 183, hair: 'dark', beard: false },
        { name: 'Bukayo Saka', country: 'England', continent: 'europe', position: 'Forward', clubs: ['Arsenal'], birthYear: 2001, worldCup: false, ballon: false, leagues: ['Premier League'], height: 178, hair: 'dark', beard: false },
        { name: 'Florian Wirtz', country: 'Germany', continent: 'europe', position: 'Midfielder', clubs: ['Bayer Leverkusen'], birthYear: 2003, worldCup: false, ballon: false, leagues: ['Bundesliga'], height: 176, hair: 'dark', beard: false },
        { name: 'Pedri', country: 'Spain', continent: 'europe', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 2002, worldCup: false, ballon: false, leagues: ['La Liga'], height: 174, hair: 'dark', beard: false },
        { name: 'Gavi', country: 'Spain', continent: 'europe', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 2004, worldCup: false, ballon: false, leagues: ['La Liga'], height: 173, hair: 'dark', beard: false },
        { name: 'Eduardo Camavinga', country: 'France', continent: 'europe', position: 'Midfielder', clubs: ['Real Madrid'], birthYear: 2002, worldCup: false, ballon: false, leagues: ['La Liga'], height: 182, hair: 'dark', beard: false },
        { name: 'Warren Zaïre-Emery', country: 'France', continent: 'europe', position: 'Midfielder', clubs: ['PSG'], birthYear: 2006, worldCup: false, ballon: false, leagues: ['Ligue 1'], height: 175, hair: 'dark', beard: false }
      ]
    },
    'south-america': {
      '1950-1960': [
        { name: 'Diego Maradona', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'Napoli'], birthYear: 1960, worldCup: true, ballon: true, leagues: ['La Liga', 'Serie A'], height: 165, hair: 'dark', beard: false },
        { name: 'Sócrates', country: 'Brazil', continent: 'south-america', position: 'Midfielder', clubs: ['Corinthians'], birthYear: 1954, worldCup: false, ballon: false, leagues: [], height: 192, hair: 'dark', beard: true },
        { name: 'Zico', country: 'Brazil', continent: 'south-america', position: 'Midfielder', clubs: ['Flamengo', 'Udinese'], birthYear: 1953, worldCup: false, ballon: false, leagues: ['Serie A'], height: 172, hair: 'dark', beard: false },
        { name: 'Falcão', country: 'Brazil', continent: 'south-america', position: 'Midfielder', clubs: ['Roma'], birthYear: 1953, worldCup: false, ballon: false, leagues: ['Serie A'], height: 177, hair: 'dark', beard: false },
        { name: 'Careca', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Napoli'], birthYear: 1960, worldCup: false, ballon: false, leagues: ['Serie A'], height: 172, hair: 'bald', beard: false },
        { name: 'Enzo Francescoli', country: 'Uruguay', continent: 'south-america', position: 'Midfielder', clubs: ['River Plate', 'Marseille'], birthYear: 1961, worldCup: false, ballon: false, leagues: ['Ligue 1'], height: 179, hair: 'dark', beard: false },
        { name: 'Mario Kempes', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Valencia'], birthYear: 1954, worldCup: true, ballon: false, leagues: ['La Liga'], height: 176, hair: 'dark', beard: false },
        { name: 'Hugo Sánchez', country: 'Mexico', continent: 'north-america', position: 'Forward', clubs: ['Real Madrid', 'Atletico Madrid'], birthYear: 1958, worldCup: false, ballon: false, leagues: ['La Liga'], height: 175, hair: 'dark', beard: false },
        { name: 'Jairzinho', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Botafogo', 'Marseille'], birthYear: 1944, worldCup: true, ballon: false, leagues: ['Ligue 1'], height: 175, hair: 'dark', beard: false },
        { name: 'Teófilo Cubillas', country: 'Peru', continent: 'south-america', position: 'Midfielder', clubs: ['FC Porto'], birthYear: 1949, worldCup: false, ballon: false, leagues: [], height: 175, hair: 'dark', beard: false }
      ],
      '1960-1970': [
        { name: 'Romário', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['PSV', 'Barcelona'], birthYear: 1966, worldCup: true, ballon: true, leagues: ['La Liga'], height: 167, hair: 'dark', beard: false },
        { name: 'Gabriel Batistuta', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Fiorentina', 'Roma'], birthYear: 1969, worldCup: false, ballon: false, leagues: ['Serie A'], height: 185, hair: 'dark', beard: false },
        { name: 'Carlos Valderrama', country: 'Colombia', continent: 'south-america', position: 'Midfielder', clubs: ['Montpellier'], birthYear: 1961, worldCup: false, ballon: false, leagues: ['Ligue 1'], height: 175, hair: 'blonde', beard: false },
        { name: 'Claudio Caniggia', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Atalanta', 'Roma'], birthYear: 1967, worldCup: false, ballon: false, leagues: ['Serie A'], height: 175, hair: 'blonde', beard: false },
        { name: 'Bebeto', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Deportivo'], birthYear: 1964, worldCup: true, ballon: false, leagues: ['La Liga'], height: 175, hair: 'dark', beard: false },
        { name: 'Jorginho', country: 'Brazil', continent: 'south-america', position: 'Midfielder', clubs: ['Bayern Munich'], birthYear: 1964, worldCup: true, ballon: false, leagues: ['Bundesliga'], height: 185, hair: 'dark', beard: false },
        { name: 'Iván Zamorano', country: 'Chile', continent: 'south-america', position: 'Forward', clubs: ['Real Madrid', 'Inter Milan'], birthYear: 1967, worldCup: false, ballon: false, leagues: ['La Liga', 'Serie A'], height: 178, hair: 'dark', beard: false },
        { name: 'Marcelo Salas', country: 'Chile', continent: 'south-america', position: 'Forward', clubs: ['Lazio', 'Juventus'], birthYear: 1974, worldCup: false, ballon: false, leagues: ['Serie A'], height: 174, hair: 'dark', beard: false },
        { name: 'Claudio Taffarel', country: 'Brazil', continent: 'south-america', position: 'Goalkeeper', clubs: ['Parma'], birthYear: 1966, worldCup: true, ballon: false, leagues: ['Serie A'], height: 180, hair: 'dark', beard: false },
        { name: 'Cafú', country: 'Brazil', continent: 'south-america', position: 'Defender', clubs: ['Roma', 'AC Milan'], birthYear: 1970, worldCup: true, ballon: false, leagues: ['Serie A'], height: 176, hair: 'bald', beard: false }
      ],
      '1970-1980': [
        { name: 'Ronaldo Nazário', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'Inter Milan', 'Real Madrid'], birthYear: 1976, worldCup: true, ballon: true, leagues: ['La Liga', 'Serie A'], height: 183, hair: 'dark', beard: false },
        { name: 'Rivaldo', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Barcelona'], birthYear: 1972, worldCup: true, ballon: true, leagues: ['La Liga'], height: 186, hair: 'dark', beard: false },
        { name: 'Ronaldinho', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'AC Milan'], birthYear: 1980, worldCup: true, ballon: true, leagues: ['La Liga', 'Serie A'], height: 181, hair: 'dark', beard: false },
        { name: 'Juan Román Riquelme', country: 'Argentina', continent: 'south-america', position: 'Midfielder', clubs: ['Barcelona', 'Villarreal'], birthYear: 1978, worldCup: false, ballon: false, leagues: ['La Liga'], height: 182, hair: 'dark', beard: false },
        { name: 'Hernán Crespo', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Parma', 'Inter Milan', 'Chelsea'], birthYear: 1975, worldCup: false, ballon: false, leagues: ['Serie A', 'Premier League'], height: 184, hair: 'dark', beard: false },
        { name: 'Adriano', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Inter Milan'], birthYear: 1982, worldCup: false, ballon: false, leagues: ['Serie A'], height: 189, hair: 'dark', beard: false },
        { name: 'Roberto Carlos', country: 'Brazil', continent: 'south-america', position: 'Defender', clubs: ['Real Madrid'], birthYear: 1973, worldCup: true, ballon: false, leagues: ['La Liga'], height: 168, hair: 'dark', beard: false },
        { name: 'Javier Saviola', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'Real Madrid'], birthYear: 1981, worldCup: false, ballon: false, leagues: ['La Liga'], height: 168, hair: 'dark', beard: false },
        { name: 'Kaká', country: 'Brazil', continent: 'south-america', position: 'Midfielder', clubs: ['AC Milan', 'Real Madrid'], birthYear: 1982, worldCup: true, ballon: true, leagues: ['Serie A', 'La Liga'], height: 186, hair: 'dark', beard: false },
        { name: 'Robinho', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Real Madrid', 'Manchester City'], birthYear: 1984, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 172, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Lionel Messi', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'PSG', 'Inter Miami'], birthYear: 1987, worldCup: true, ballon: true, leagues: ['La Liga', 'Ligue 1'], height: 170, hair: 'dark', beard: true },
        { name: 'Luis Suárez', country: 'Uruguay', continent: 'south-america', position: 'Forward', clubs: ['Liverpool', 'Barcelona'], birthYear: 1987, worldCup: false, ballon: false, leagues: ['Premier League', 'La Liga'], height: 182, hair: 'dark', beard: true },
        { name: 'Sergio Agüero', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Manchester City', 'Barcelona'], birthYear: 1988, worldCup: false, ballon: false, leagues: ['Premier League', 'La Liga'], height: 173, hair: 'dark', beard: false },
        { name: 'Alexis Sánchez', country: 'Chile', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'Arsenal'], birthYear: 1988, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 169, hair: 'dark', beard: false },
        { name: 'James Rodríguez', country: 'Colombia', continent: 'south-america', position: 'Midfielder', clubs: ['Real Madrid', 'Bayern Munich'], birthYear: 1991, worldCup: false, ballon: false, leagues: ['La Liga', 'Bundesliga'], height: 180, hair: 'dark', beard: true },
        { name: 'Arturo Vidal', country: 'Chile', continent: 'south-america', position: 'Midfielder', clubs: ['Juventus', 'Bayern Munich', 'Barcelona'], birthYear: 1987, worldCup: false, ballon: false, leagues: ['Serie A', 'Bundesliga', 'La Liga'], height: 180, hair: 'dark', beard: false },
        { name: 'Radamel Falcao', country: 'Colombia', continent: 'south-america', position: 'Forward', clubs: ['Atletico Madrid', 'Monaco'], birthYear: 1986, worldCup: false, ballon: false, leagues: ['La Liga', 'Ligue 1'], height: 177, hair: 'dark', beard: false },
        { name: 'Ángel Di María', country: 'Argentina', continent: 'south-america', position: 'Midfielder', clubs: ['Real Madrid', 'Manchester United', 'PSG'], birthYear: 1988, worldCup: true, ballon: false, leagues: ['La Liga', 'Premier League', 'Ligue 1'], height: 180, hair: 'dark', beard: false },
        { name: 'Paulo Dybala', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Juventus', 'Roma'], birthYear: 1993, worldCup: true, ballon: false, leagues: ['Serie A'], height: 177, hair: 'dark', beard: true },
        { name: 'Edinson Cavani', country: 'Uruguay', continent: 'south-america', position: 'Forward', clubs: ['Napoli', 'PSG', 'Manchester United'], birthYear: 1987, worldCup: false, ballon: false, leagues: ['Serie A', 'Ligue 1', 'Premier League'], height: 184, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Neymar', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Barcelona', 'PSG'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['La Liga', 'Ligue 1'], height: 175, hair: 'dark', beard: false },
        { name: 'Vinícius Júnior', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Real Madrid'], birthYear: 2000, worldCup: false, ballon: false, leagues: ['La Liga'], height: 176, hair: 'dark', beard: false },
        { name: 'Rodrygo', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Real Madrid'], birthYear: 2001, worldCup: false, ballon: false, leagues: ['La Liga'], height: 174, hair: 'dark', beard: false },
        { name: 'Lautaro Martínez', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Inter Milan'], birthYear: 1997, worldCup: true, ballon: false, leagues: ['Serie A'], height: 174, hair: 'dark', beard: false },
        { name: 'Julián Álvarez', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Manchester City'], birthYear: 2000, worldCup: true, ballon: false, leagues: ['Premier League'], height: 170, hair: 'dark', beard: false },
        { name: 'Éder Militão', country: 'Brazil', continent: 'south-america', position: 'Defender', clubs: ['Real Madrid'], birthYear: 1998, worldCup: false, ballon: false, leagues: ['La Liga'], height: 186, hair: 'dark', beard: false },
        { name: 'Alisson Becker', country: 'Brazil', continent: 'south-america', position: 'Goalkeeper', clubs: ['Roma', 'Liverpool'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['Serie A', 'Premier League'], height: 193, hair: 'dark', beard: true },
        { name: 'Casemiro', country: 'Brazil', continent: 'south-america', position: 'Midfielder', clubs: ['Real Madrid', 'Manchester United'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 185, hair: 'dark', beard: false },
        { name: 'Marquinhos', country: 'Brazil', continent: 'south-america', position: 'Defender', clubs: ['PSG'], birthYear: 1994, worldCup: false, ballon: false, leagues: ['Ligue 1'], height: 183, hair: 'dark', beard: false },
        { name: 'Federico Valverde', country: 'Uruguay', continent: 'south-america', position: 'Midfielder', clubs: ['Real Madrid'], birthYear: 1998, worldCup: false, ballon: false, leagues: ['La Liga'], height: 182, hair: 'dark', beard: false }
      ],
      '2000-2010': [
        { name: 'Endrick', country: 'Brazil', continent: 'south-america', position: 'Forward', clubs: ['Real Madrid'], birthYear: 2006, worldCup: false, ballon: false, leagues: ['La Liga'], height: 173, hair: 'dark', beard: false },
        { name: 'Enzo Fernández', country: 'Argentina', continent: 'south-america', position: 'Midfielder', clubs: ['Chelsea'], birthYear: 2001, worldCup: true, ballon: false, leagues: ['Premier League'], height: 178, hair: 'dark', beard: false },
        { name: 'Alejandro Garnacho', country: 'Argentina', continent: 'south-america', position: 'Forward', clubs: ['Manchester United'], birthYear: 2004, worldCup: false, ballon: false, leagues: ['Premier League'], height: 180, hair: 'dark', beard: false }
      ]
    },
    africa: {
      '1960-1970': [
        { name: 'George Weah', country: 'Liberia', continent: 'africa', position: 'Forward', clubs: ['AC Milan', 'PSG', 'Chelsea'], birthYear: 1966, worldCup: false, ballon: true, leagues: ['Serie A', 'Ligue 1', 'Premier League'], height: 185, hair: 'dark', beard: false },
        { name: 'Abedi Pele', country: 'Ghana', continent: 'africa', position: 'Forward', clubs: ['Marseille'], birthYear: 1964, worldCup: false, ballon: false, leagues: ['Ligue 1'], height: 175, hair: 'dark', beard: false },
        { name: 'Roger Milla', country: 'Cameroon', continent: 'africa', position: 'Forward', clubs: ['Monaco', 'Saint-Étienne'], birthYear: 1952, worldCup: false, ballon: false, leagues: ['Ligue 1'], height: 176, hair: 'dark', beard: false }
      ],
      '1970-1980': [
        { name: 'Jay-Jay Okocha', country: 'Nigeria', continent: 'africa', position: 'Midfielder', clubs: ['PSG', 'Bolton'], birthYear: 1973, worldCup: false, ballon: false, leagues: ['Ligue 1', 'Premier League'], height: 173, hair: 'dark', beard: false },
        { name: 'Nwankwo Kanu', country: 'Nigeria', continent: 'africa', position: 'Forward', clubs: ['Ajax', 'Inter Milan', 'Arsenal'], birthYear: 1976, worldCup: false, ballon: false, leagues: ['Serie A', 'Premier League'], height: 197, hair: 'dark', beard: false },
        { name: 'Didier Drogba', country: 'Ivory Coast', continent: 'africa', position: 'Forward', clubs: ['Chelsea'], birthYear: 1978, worldCup: false, ballon: false, leagues: ['Premier League'], height: 188, hair: 'bald', beard: false },
        { name: 'Samuel Eto\'o', country: 'Cameroon', continent: 'africa', position: 'Forward', clubs: ['Barcelona', 'Inter Milan'], birthYear: 1981, worldCup: false, ballon: false, leagues: ['La Liga', 'Serie A'], height: 180, hair: 'dark', beard: false },
        { name: 'Michael Essien', country: 'Ghana', continent: 'africa', position: 'Midfielder', clubs: ['Chelsea', 'Real Madrid'], birthYear: 1982, worldCup: false, ballon: false, leagues: ['Premier League', 'La Liga'], height: 178, hair: 'dark', beard: false },
        { name: 'Emmanuel Adebayor', country: 'Togo', continent: 'africa', position: 'Forward', clubs: ['Arsenal', 'Manchester City'], birthYear: 1984, worldCup: false, ballon: false, leagues: ['Premier League'], height: 191, hair: 'dark', beard: false },
        { name: 'Yaya Touré', country: 'Ivory Coast', continent: 'africa', position: 'Midfielder', clubs: ['Barcelona', 'Manchester City'], birthYear: 1983, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 188, hair: 'bald', beard: false },
        { name: 'Sulley Muntari', country: 'Ghana', continent: 'africa', position: 'Midfielder', clubs: ['Inter Milan', 'AC Milan'], birthYear: 1984, worldCup: false, ballon: false, leagues: ['Serie A'], height: 178, hair: 'dark', beard: false },
        { name: 'John Obi Mikel', country: 'Nigeria', continent: 'africa', position: 'Midfielder', clubs: ['Chelsea'], birthYear: 1987, worldCup: false, ballon: false, leagues: ['Premier League'], height: 188, hair: 'dark', beard: false },
        { name: 'Asamoah Gyan', country: 'Ghana', continent: 'africa', position: 'Forward', clubs: ['Sunderland', 'Udinese'], birthYear: 1985, worldCup: false, ballon: false, leagues: ['Premier League', 'Serie A'], height: 185, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Mohamed Salah', country: 'Egypt', continent: 'africa', position: 'Forward', clubs: ['Chelsea', 'Roma', 'Liverpool'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['Premier League', 'Serie A'], height: 175, hair: 'dark', beard: true },
        { name: 'Riyad Mahrez', country: 'Algeria', continent: 'africa', position: 'Forward', clubs: ['Leicester City', 'Manchester City'], birthYear: 1991, worldCup: false, ballon: false, leagues: ['Premier League'], height: 179, hair: 'dark', beard: true },
        { name: 'Sadio Mané', country: 'Senegal', continent: 'africa', position: 'Forward', clubs: ['Liverpool', 'Bayern Munich'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['Premier League', 'Bundesliga'], height: 175, hair: 'dark', beard: false },
        { name: 'Pierre-Emerick Aubameyang', country: 'Gabon', continent: 'africa', position: 'Forward', clubs: ['Borussia Dortmund', 'Arsenal'], birthYear: 1989, worldCup: false, ballon: false, leagues: ['Bundesliga', 'Premier League'], height: 187, hair: 'dark', beard: false },
        { name: 'Naby Keïta', country: 'Guinea', continent: 'africa', position: 'Midfielder', clubs: ['RB Leipzig', 'Liverpool'], birthYear: 1995, worldCup: false, ballon: false, leagues: ['Bundesliga', 'Premier League'], height: 172, hair: 'dark', beard: false },
        { name: 'Wilfried Zaha', country: 'Ivory Coast', continent: 'africa', position: 'Forward', clubs: ['Manchester United', 'Crystal Palace'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['Premier League'], height: 180, hair: 'dark', beard: false },
        { name: 'Thomas Partey', country: 'Ghana', continent: 'africa', position: 'Midfielder', clubs: ['Atletico Madrid', 'Arsenal'], birthYear: 1993, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 185, hair: 'dark', beard: false },
        { name: 'Kalidou Koulibaly', country: 'Senegal', continent: 'africa', position: 'Defender', clubs: ['Napoli', 'Chelsea'], birthYear: 1991, worldCup: false, ballon: false, leagues: ['Serie A', 'Premier League'], height: 187, hair: 'bald', beard: false },
        { name: 'Hakim Ziyech', country: 'Morocco', continent: 'africa', position: 'Midfielder', clubs: ['Ajax', 'Chelsea'], birthYear: 1993, worldCup: false, ballon: false, leagues: ['Premier League'], height: 180, hair: 'dark', beard: false },
        { name: 'Nicolas Pépé', country: 'Ivory Coast', continent: 'africa', position: 'Forward', clubs: ['Lille', 'Arsenal'], birthYear: 1995, worldCup: false, ballon: false, leagues: ['Ligue 1', 'Premier League'], height: 183, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Victor Osimhen', country: 'Nigeria', continent: 'africa', position: 'Forward', clubs: ['Napoli'], birthYear: 1998, worldCup: false, ballon: false, leagues: ['Serie A'], height: 185, hair: 'dark', beard: false },
        { name: 'Achraf Hakimi', country: 'Morocco', continent: 'africa', position: 'Defender', clubs: ['Inter Milan', 'PSG'], birthYear: 1998, worldCup: false, ballon: false, leagues: ['Serie A', 'Ligue 1'], height: 181, hair: 'dark', beard: false },
        { name: 'Sofyan Amrabat', country: 'Morocco', continent: 'africa', position: 'Midfielder', clubs: ['Fiorentina', 'Manchester United'], birthYear: 1996, worldCup: false, ballon: false, leagues: ['Serie A', 'Premier League'], height: 183, hair: 'dark', beard: true }
      ]
    },
    asia: {
      '1970-1980': [
        { name: 'Park Ji-sung', country: 'South Korea', continent: 'asia', position: 'Midfielder', clubs: ['PSV', 'Manchester United'], birthYear: 1981, worldCup: false, ballon: false, leagues: ['Premier League'], height: 175, hair: 'dark', beard: false },
        { name: 'Hidetoshi Nakata', country: 'Japan', continent: 'asia', position: 'Midfielder', clubs: ['Roma', 'Parma'], birthYear: 1977, worldCup: false, ballon: false, leagues: ['Serie A'], height: 175, hair: 'dark', beard: false },
        { name: 'Shinji Kagawa', country: 'Japan', continent: 'asia', position: 'Midfielder', clubs: ['Borussia Dortmund', 'Manchester United'], birthYear: 1989, worldCup: false, ballon: false, leagues: ['Bundesliga', 'Premier League'], height: 175, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Son Heung-min', country: 'South Korea', continent: 'asia', position: 'Forward', clubs: ['Bayer Leverkusen', 'Tottenham'], birthYear: 1992, worldCup: false, ballon: false, leagues: ['Bundesliga', 'Premier League'], height: 183, hair: 'dark', beard: false },
        { name: 'Shinji Okazaki', country: 'Japan', continent: 'asia', position: 'Forward', clubs: ['Leicester City'], birthYear: 1986, worldCup: false, ballon: false, leagues: ['Premier League'], height: 174, hair: 'dark', beard: false },
        { name: 'Ki Sung-yueng', country: 'South Korea', continent: 'asia', position: 'Midfielder', clubs: ['Swansea City', 'Newcastle United'], birthYear: 1989, worldCup: false, ballon: false, leagues: ['Premier League'], height: 186, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Takefusa Kubo', country: 'Japan', continent: 'asia', position: 'Forward', clubs: ['Real Madrid', 'Real Sociedad'], birthYear: 2001, worldCup: false, ballon: false, leagues: ['La Liga'], height: 173, hair: 'dark', beard: false },
        { name: 'Lee Kang-in', country: 'South Korea', continent: 'asia', position: 'Midfielder', clubs: ['Valencia', 'PSG'], birthYear: 2001, worldCup: false, ballon: false, leagues: ['La Liga', 'Ligue 1'], height: 173, hair: 'dark', beard: false },
        { name: 'Hwang Hee-chan', country: 'South Korea', continent: 'asia', position: 'Forward', clubs: ['RB Leipzig', 'Wolverhampton'], birthYear: 1996, worldCup: false, ballon: false, leagues: ['Bundesliga', 'Premier League'], height: 177, hair: 'dark', beard: false }
      ]
    },
    'north-america': {
      '1950-1960': [
        { name: 'Hugo Sánchez', country: 'Mexico', continent: 'north-america', position: 'Forward', clubs: ['Real Madrid', 'Atletico Madrid'], birthYear: 1958, worldCup: false, ballon: false, leagues: ['La Liga'], height: 175, hair: 'dark', beard: false }
      ],
      '1970-1980': [
        { name: 'Rafael Márquez', country: 'Mexico', continent: 'north-america', position: 'Defender', clubs: ['Barcelona'], birthYear: 1979, worldCup: false, ballon: false, leagues: ['La Liga'], height: 182, hair: 'dark', beard: false },
        { name: 'Cuauhtémoc Blanco', country: 'Mexico', continent: 'north-america', position: 'Forward', clubs: ['Valladolid'], birthYear: 1973, worldCup: false, ballon: false, leagues: ['La Liga'], height: 176, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Javier Hernández', country: 'Mexico', continent: 'north-america', position: 'Forward', clubs: ['Manchester United', 'Real Madrid'], birthYear: 1988, worldCup: false, ballon: false, leagues: ['Premier League', 'La Liga'], height: 175, hair: 'dark', beard: false },
        { name: 'Carlos Vela', country: 'Mexico', continent: 'north-america', position: 'Forward', clubs: ['Arsenal', 'Real Sociedad'], birthYear: 1989, worldCup: false, ballon: false, leagues: ['Premier League', 'La Liga'], height: 177, hair: 'dark', beard: true },
        { name: 'Giovani dos Santos', country: 'Mexico', continent: 'north-america', position: 'Forward', clubs: ['Barcelona', 'Tottenham'], birthYear: 1989, worldCup: false, ballon: false, leagues: ['La Liga', 'Premier League'], height: 170, hair: 'dark', beard: false },
        { name: 'Andrés Guardado', country: 'Mexico', continent: 'north-america', position: 'Midfielder', clubs: ['Valencia', 'PSV'], birthYear: 1986, worldCup: false, ballon: false, leagues: ['La Liga'], height: 169, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Alphonso Davies', country: 'Canada', continent: 'north-america', position: 'Defender', clubs: ['Bayern Munich'], birthYear: 2000, worldCup: false, ballon: false, leagues: ['Bundesliga'], height: 183, hair: 'dark', beard: false },
        { name: 'Hirving Lozano', country: 'Mexico', continent: 'north-america', position: 'Forward', clubs: ['PSV', 'Napoli'], birthYear: 1995, worldCup: false, ballon: false, leagues: ['Serie A'], height: 175, hair: 'dark', beard: false },
        { name: 'Christian Pulisic', country: 'USA', continent: 'north-america', position: 'Forward', clubs: ['Borussia Dortmund', 'Chelsea'], birthYear: 1998, worldCup: false, ballon: false, leagues: ['Bundesliga', 'Premier League'], height: 173, hair: 'dark', beard: false }
      ]
    }
  };

  const calculateScore = (validQuestions, filtersUsed) => {
    const baseScore = 1000;
    const questionPenalty = validQuestions * 30;
    const filterPenalty = filtersUsed * 100;
    const earlyBonus = Math.max(0, (20 - validQuestions) * 20);
    
    return Math.max(0, baseScore - questionPenalty - filterPenalty + earlyBonus);
  };

  const saveHighScore = (playerName, score) => {
    const newScore = {
      name: playerName,
      score: score,
      date: new Date().toISOString()
    };
    
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    setHighScores(updatedScores);
    localStorage.setItem('footballQuizHighScores', JSON.stringify(updatedScores));
  };

  const startGame = () => {
    if (!username.trim()) {
      alert(language === 'no' ? 'Vennligst skriv inn navnet ditt' : 'Please enter your name');
      return;
    }

    let allPlayers = [];
    
    Object.keys(playerDatabase).forEach(continent => {
      Object.keys(playerDatabase[continent]).forEach(period => {
        playerDatabase[continent][period].forEach(player => {
          allPlayers.push({ ...player, birthPeriod: period, birthContinent: continent });
        });
      });
    });

    if (useFilters.continent && selectedContinent) {
      allPlayers = allPlayers.filter(p => p.birthContinent === selectedContinent);
    }
    
    if (useFilters.period && selectedPeriod) {
      allPlayers = allPlayers.filter(p => p.birthPeriod === selectedPeriod);
    }
    
    if (useFilters.league && selectedLeague) {
      const leagueNames = {
        'premier-league': 'Premier League',
        'la-liga': 'La Liga',
        'serie-a': 'Serie A',
        'bundesliga': 'Bundesliga',
        'ligue-1': 'Ligue 1'
      };
      allPlayers = allPlayers.filter(p => 
        p.leagues && p.leagues.includes(leagueNames[selectedLeague])
      );
    }

    if (allPlayers.length === 0) {
      alert(language === 'no' ? 
        'Ingen spillere tilgjengelig for denne kombinasjonen. Prøv en annen.' : 
        'No players available for this combination. Try another selection.');
      return;
    }

    const randomPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    setCurrentPlayer(randomPlayer);
    setGameState('playing');
    setQuestions([]);
    setRemainingQuestions(20);
    setShowHint(false);
  };

  const verifyAnswer = async (question) => {
    if (!currentPlayer) return;

    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const q = question.toLowerCase();
    let answer = 'Unknown';
    let explanation = '';
    let counted = true;

    if (q.includes('forward') || q.includes('striker') || q.includes('attacker') || q.includes('spiss')) {
      answer = currentPlayer.position === 'Forward' ? t.yes : t.no;
      explanation = `${t.position} ${currentPlayer.position}`;
    } else if (q.includes('midfielder') || q.includes('midfield') || q.includes('midtbane')) {
      answer = currentPlayer.position === 'Midfielder' ? t.yes : t.no;
      explanation = `${t.position} ${currentPlayer.position}`;
    } else if (q.includes('defender') || q.includes('defence') || q.includes('defense') || q.includes('forsvar')) {
      answer = currentPlayer.position === 'Defender' ? t.yes : t.no;
      explanation = `${t.position} ${currentPlayer.position}`;
    } else if (q.includes('goalkeeper') || q.includes('keeper') || q.includes('målvakt')) {
      answer = currentPlayer.position === 'Goalkeeper' ? t.yes : t.no;
      explanation = `${t.position} ${currentPlayer.position}`;
    } else if (q.includes('born before') || q.includes('født før')) {
      const yearMatch = q.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        answer = currentPlayer.birthYear < year ? t.yes : t.no;
        explanation = `${t.birthYear} ${currentPlayer.birthYear}`;
      } else {
        counted = false;
      }
    } else if (q.includes('born after') || q.includes('født etter')) {
      const yearMatch = q.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        answer = currentPlayer.birthYear > year ? t.yes : t.no;
        explanation = `${t.birthYear} ${currentPlayer.birthYear}`;
      } else {
        counted = false;
      }
    } else if (q.includes('world cup') || q.includes('vm')) {
      answer = currentPlayer.worldCup ? t.yes : t.no;
      explanation = currentPlayer.worldCup ? (language === 'no' ? 'Vant VM' : 'Won World Cup') : (language === 'no' ? 'Vant ikke VM' : 'Did not win World Cup');
    } else if (q.includes('ballon')) {
      answer = currentPlayer.ballon ? t.yes : t.no;
      explanation = currentPlayer.ballon ? (language === 'no' ? 'Vant Ballon d\'Or' : 'Won Ballon d\'Or') : (language === 'no' ? 'Vant ikke Ballon d\'Or' : 'Did not win Ballon d\'Or');
    } else if (q.includes('premier league')) {
      answer = currentPlayer.leagues && currentPlayer.leagues.includes('Premier League') ? t.yes : t.no;
      explanation = answer === t.yes ? (language === 'no' ? 'Spilte i Premier League' : 'Played in Premier League') : (language === 'no' ? 'Spilte ikke i Premier League' : 'Did not play in Premier League');
    } else if (q.includes('la liga')) {
      answer = currentPlayer.leagues && currentPlayer.leagues.includes('La Liga') ? t.yes : t.no;
    } else if (q.includes('serie a')) {
      answer = currentPlayer.leagues && currentPlayer.leagues.includes('Serie A') ? t.yes : t.no;
    } else if (q.includes('bundesliga')) {
      answer = currentPlayer.leagues && currentPlayer.leagues.includes('Bundesliga') ? t.yes : t.no;
    } else if (q.includes('ligue 1') || (q.includes('ligue') && q.includes('1'))) {
      answer = currentPlayer.leagues && currentPlayer.leagues.includes('Ligue 1') ? t.yes : t.no;
    } else if (q.includes('tall') || q.includes('høy') || q.includes('height') || q.includes('over 180') || q.includes('over 185') || q.includes('under 175')) {
      if (q.includes('over 185') || q.includes('over 190')) {
        answer = currentPlayer.height > 185 ? t.yes : t.no;
      } else if (q.includes('over 180')) {
        answer = currentPlayer.height > 180 ? t.yes : t.no;
      } else if (q.includes('under 175') || q.includes('under 180')) {
        answer = currentPlayer.height < 175 ? t.yes : t.no;
      }
      explanation = `${t.height} ${currentPlayer.height} ${t.cm}`;
    } else if (q.includes('beard') || q.includes('skjegg')) {
      answer = currentPlayer.beard ? t.yes : t.no;
      explanation = currentPlayer.beard ? (language === 'no' ? 'Har skjegg' : 'Has beard') : (language === 'no' ? 'Har ikke skjegg' : 'No beard');
    } else if (q.includes('blonde') || q.includes('blond') || q.includes('light hair') || q.includes('lyst hår')) {
      answer = currentPlayer.hair === 'blonde' || currentPlayer.hair === 'light' ? t.yes : t.no;
      explanation = language === 'no' ? `Hårfarge: ${currentPlayer.hair}` : `Hair: ${currentPlayer.hair}`;
    } else if (q.includes('bald') || q.includes('skallet')) {
      answer = currentPlayer.hair === 'bald' ? t.yes : t.no;
      explanation = language === 'no' ? `Hårfarge: ${currentPlayer.hair}` : `Hair: ${currentPlayer.hair}`;
    } else if (q.includes('real madrid')) {
      answer = currentPlayer.clubs.some(c => c.includes('Real Madrid')) ? t.yes : t.no;
    } else if (q.includes('barcelona')) {
      answer = currentPlayer.clubs.some(c => c.includes('Barcelona')) ? t.yes : t.no;
    } else if (q.includes('manchester')) {
      answer = currentPlayer.clubs.some(c => c.includes('Manchester')) ? t.yes : t.no;
    } else if (q.includes('liverpool')) {
      answer = currentPlayer.clubs.some(c => c.includes('Liverpool')) ? t.yes : t.no;
    } else if (q.includes('chelsea')) {
      answer = currentPlayer.clubs.some(c => c.includes('Chelsea')) ? t.yes : t.no;
    } else if (q.includes('arsenal')) {
      answer = currentPlayer.clubs.some(c => c.includes('Arsenal')) ? t.yes : t.no;
    } else if (q.includes('juventus')) {
      answer = currentPlayer.clubs.some(c => c.includes('Juventus')) ? t.yes : t.no;
    } else if (q.includes('milan')) {
      answer = currentPlayer.clubs.some(c => c.includes('Milan')) ? t.yes : t.no;
    } else if (q.includes('psg') || q.includes('paris')) {
      answer = currentPlayer.clubs.some(c => c.includes('PSG')) ? t.yes : t.no;
    } else if (q.includes('bayern')) {
      answer = currentPlayer.clubs.some(c => c.includes('Bayern')) ? t.yes : t.no;
    } else if (q.includes('brazil') || q.includes('brasil')) {
      answer = currentPlayer.country === 'Brazil' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('argentina')) {
      answer = currentPlayer.country === 'Argentina' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('portugal')) {
      answer = currentPlayer.country === 'Portugal' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('spain') || q.includes('spania')) {
      answer = currentPlayer.country === 'Spain' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('france') || q.includes('frankrike')) {
      answer = currentPlayer.country === 'France' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('england')) {
      answer = currentPlayer.country === 'England' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('germany') || q.includes('tyskland')) {
      answer = currentPlayer.country === 'Germany' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('italy') || q.includes('italia')) {
      answer = currentPlayer.country === 'Italy' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else if (q.includes('norway') || q.includes('norge')) {
      answer = currentPlayer.country === 'Norway' ? t.yes : t.no;
      explanation = `${t.country} ${currentPlayer.country}`;
    } else {
      answer = language === 'no' ? 'Kan ikke bekrefte' : 'Unable to verify';
      explanation = language === 'no' ? 
        'Prøv å spørre om: posisjon, klubber, VM, Ballon d\'Or, fødselsår, eller utseende' :
        'Try asking about: position, clubs, World Cup, Ballon d\'Or, birth year, or appearance';
      counted = false;
    }

    setIsVerifying(false);
    return { answer, explanation, counted };
  };

  const handleQuestionSubmit = async () => {
    if (!currentQuestion.trim() || remainingQuestions === 0 || isVerifying) return;

    const result = await verifyAnswer(currentQuestion);
    
    const newQuestion = {
      question: currentQuestion,
      answer: result.answer,
      explanation: result.explanation,
      counted: result.counted
    };
    
    // Legg til nytt spørsmål FØRST i listen (nyeste øverst)
    setQuestions([newQuestion, ...questions]);
    
    setCurrentQuestion('');
    
    // Bare reduser spørsmålstelleren hvis spørsmålet telles
    if (result.counted) {
      setRemainingQuestions(remainingQuestions - 1);
      
      if (remainingQuestions - 1 === 5 && !showHint) {
        setShowHint(true);
      }
    }
  };

  const handleFinalGuess = () => {
    if (!finalGuess.trim()) return;
    
    const isCorrect = finalGuess.toLowerCase().includes(currentPlayer.name.toLowerCase()) ||
                      currentPlayer.name.toLowerCase().includes(finalGuess.toLowerCase());
    
    const validQuestionsCount = questions.filter(q => q.counted).length;
    const filtersUsed = Object.values(useFilters).filter(f => f).length;
    const finalScore = calculateScore(validQuestionsCount, filtersUsed);
    setScore(finalScore);
    
    if (isCorrect) {
      saveHighScore(username, finalScore);
    }
    
    setGameState(isCorrect ? 'won' : 'lost');
  };

  const resetGame = () => {
    setGameState('setup');
    setCurrentPlayer(null);
    setQuestions([]);
    setCurrentQuestion('');
    setRemainingQuestions(20);
    setFinalGuess('');
    setShowHint(false);
    setScore(0);
  };

  if (gameState === 'language') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Football Player<br/>20 Questions
          </h1>
          <div className="space-y-4">
            <button
              onClick={() => { setLanguage('en'); setGameState('username'); }}
              className="w-full py-4 bg-blue-500 text-white font-bold text-lg rounded-xl hover:bg-blue-600 transition-all"
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => { setLanguage('no'); setGameState('username'); }}
              className="w-full py-4 bg-red-500 text-white font-bold text-lg rounded-xl hover:bg-red-600 transition-all"
            >
              🇳🇴 Norsk
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'username') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <User className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{t.enterUsername}</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && username.trim() && setGameState('setup')}
            placeholder={t.usernamePlaceholder}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 mb-4"
            autoFocus
          />
          <button
            onClick={() => username.trim() && setGameState('setup')}
            disabled={!username.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all"
          >
            {t.continue}
          </button>
          <button
            onClick={() => setGameState('language')}
            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            ← {t.selectLanguage}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.title}</h1>
              <p className="text-gray-600 mb-2">{t.subtitle}</p>
              <p className="text-sm text-blue-600 font-semibold">
                {language === 'no' ? `Spiller: ${username}` : `Player: ${username}`}
              </p>
              <button
                onClick={() => setGameState('username')}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {language === 'no' ? 'Endre navn' : 'Change name'}
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
                <div className="flex items-start">
                  <Filter className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{t.useFiltersTitle}</h3>
                    <p className="text-sm text-gray-700 mb-3">{t.useFiltersDesc}</p>
                    <div className="space-y-2">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useFilters.period}
                          onChange={(e) => setUseFilters({...useFilters, period: e.target.checked})}
                          className="w-5 h-5 text-blue-600 rounded mr-3"
                        />
                        <span className="text-gray-700">{t.usePeriodFilter} (-100 {language === 'no' ? 'poeng' : 'points'})</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useFilters.continent}
                          onChange={(e) => setUseFilters({...useFilters, continent: e.target.checked})}
                          className="w-5 h-5 text-blue-600 rounded mr-3"
                        />
                        <span className="text-gray-700">{t.useContinentFilter} (-100 {language === 'no' ? 'poeng' : 'points'})</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useFilters.league}
                          onChange={(e) => setUseFilters({...useFilters, league: e.target.checked})}
                          className="w-5 h-5 text-blue-600 rounded mr-3"
                        />
                        <span className="text-gray-700">{t.useLeagueFilter} (-100 {language === 'no' ? 'poeng' : 'points'})</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {useFilters.period && (
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Calendar className="w-5 h-5 mr-2" />
                    {t.selectPeriod}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {periods.map(period => (
                      <button
                        key={period.id}
                        onClick={() => setSelectedPeriod(period.id)}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          selectedPeriod === period.id
                            ? 'bg-blue-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {useFilters.continent && (
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Globe className="w-5 h-5 mr-2" />
                    {t.selectContinent}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {continents.map(continent => (
                      <button
                        key={continent.id}
                        onClick={() => setSelectedContinent(continent.id)}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          selectedContinent === continent.id
                            ? 'bg-green-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {continent.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {useFilters.league && (
                <div>
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                    <Trophy className="w-5 h-5 mr-2" />
                    {t.selectLeague}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {leagues.map(league => (
                      <button
                        key={league.id}
                        onClick={() => setSelectedLeague(league.id)}
                        className={`p-4 rounded-xl font-medium transition-all ${
                          selectedLeague === league.id
                            ? 'bg-purple-500 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {league.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                {t.startGame}
              </button>

              {highScores.length > 0 && (
                <button
                  onClick={() => setShowHighScores(!showHighScores)}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  {showHighScores ? t.hideHighScores : t.viewHighScores}
                </button>
              )}

              {showHighScores && highScores.length > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{t.highScoresTitle}</h3>
                  <div className="space-y-2">
                    {highScores.map((score, index) => (
                      <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                            index === 1 ? 'bg-gray-300 text-gray-700' :
                            index === 2 ? 'bg-orange-400 text-orange-900' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-semibold text-gray-800">{score.name}</span>
                        </div>
                        <span className="font-bold text-blue-600">{score.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'won' || gameState === 'lost') {
    const validQuestionsCount = questions.filter(q => q.counted).length;
    const filtersUsed = Object.values(useFilters).filter(f => f).length;
    const scoreDetails = {
      base: 1000,
      questionPenalty: validQuestionsCount * 30,
      filterPenalty: filtersUsed * 100,
      bonus: Math.max(0, (20 - validQuestionsCount) * 20)
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center">
            {gameState === 'won' ? (
              <>
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{t.congratulations}</h2>
                <p className="text-xl text-gray-600 mb-4">
                  {t.youGuessed} <span className="font-bold text-green-600">{currentPlayer.name}</span>!
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 text-red-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-800 mb-2">{t.gameOver}</h2>
                <p className="text-xl text-gray-600 mb-4">
                  {t.playerWas} <span className="font-bold text-blue-600">{currentPlayer.name}</span>
                </p>
              </>
            )}
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-white mr-2" />
                <h3 className="text-3xl font-bold text-white">{t.finalScore}</h3>
              </div>
              <p className="text-5xl font-bold text-white">{score}</p>
              
              <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4 text-left text-white text-sm">
                <p className="font-semibold mb-2">{t.scoreBreakdown}</p>
                <p>{t.baseScore} {scoreDetails.base}</p>
                <p>{t.questionPenalty} -{scoreDetails.questionPenalty} ({validQuestionsCount} × 30)</p>
                <p>{t.filterPenalty} -{scoreDetails.filterPenalty} ({filtersUsed} × 100)</p>
                <p>{t.bonusPoints} +{scoreDetails.bonus}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-3">{t.playerDetails}</h3>
              <div className="text-left space-y-2">
                <p><strong>{t.country}</strong> {currentPlayer.country}</p>
                <p><strong>{t.position}</strong> {currentPlayer.position}</p>
                <p><strong>{t.birthYear}</strong> {currentPlayer.birthYear}</p>
                <p><strong>{t.clubs}</strong> {currentPlayer.clubs.join(', ')}</p>
                {currentPlayer.leagues && currentPlayer.leagues.length > 0 && (
                  <p><strong>{t.leagues}</strong> {currentPlayer.leagues.join(', ')}</p>
                )}
                <p><strong>{t.height}</strong> {currentPlayer.height} {t.cm}</p>
                <p><strong>{t.worldCup}</strong> {currentPlayer.worldCup ? t.yes : t.no}</p>
                <p><strong>{t.ballonDor}</strong> {currentPlayer.ballon ? t.yes : t.no}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">{t.questionsUsed} {validQuestionsCount} / 20</p>
              <button
                onClick={resetGame}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
              >
                {t.playAgain}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const validQuestionsCount = questions.filter(q => q.counted).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{username}'s {language === 'no' ? 'spill' : 'Game'}</h2>
            <div className="flex gap-4">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-blue-600">{validQuestionsCount}</span>
                <span className="text-gray-600 ml-1 text-sm">/ 20 {t.validQuestions}</span>
              </div>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                {t.restart}
              </button>
            </div>
          </div>

          {showHint && validQuestionsCount >= 15 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  <strong>{t.hint}</strong> {t.playerFrom} {currentPlayer.country}, {t.bornIn} {currentPlayer.birthYear}, {t.playedAs} {currentPlayer.position}
                </p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuestionSubmit()}
                placeholder={t.askQuestion}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                disabled={isVerifying || validQuestionsCount >= 20}
              />
              <button
                onClick={handleQuestionSubmit}
                disabled={isVerifying || !currentQuestion.trim() || validQuestionsCount >= 20}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                {isVerifying ? t.checking : t.asking}
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {questions.map((q, index) => (
              <div key={index} className={`rounded-xl p-4 ${q.counted ? 'bg-gray-50' : 'bg-red-50 border-2 border-red-200'}`}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-800 flex-1 mr-2">
                    {q.counted ? `Q${questions.filter((qu, i) => i >= index && qu.counted).length}` : '❌'}: {q.question}
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                    !q.counted ? 'bg-red-100 text-red-700' :
                    q.answer === t.yes || q.answer === 'Yes' ? 'bg-green-100 text-green-700' :
                    q.answer === t.no || q.answer === 'No' ? 'bg-red-100 text-red-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {q.counted ? q.answer : t.notCounted}
                  </span>
                </div>
                {q.explanation && (
                  <p className="text-sm text-gray-600 italic">{q.explanation}</p>
                )}
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.readyToGuess}</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={finalGuess}
                onChange={(e) => setFinalGuess(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleFinalGuess()}
                placeholder={t.enterPlayerName}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleFinalGuess}
                disabled={!finalGuess.trim()}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.submitGuess}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold mb-2">{t.tipsTitle}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>{t.tip1}</li>
            <li>{t.tip2}</li>
            <li>{t.tip3}</li>
            <li>{t.tip4}</li>
            <li>{t.tip5}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
