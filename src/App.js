import React, { useState, useEffect } from 'react';
import { playerDatabase } from './playerDatabase';
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
      birthYear: "Birth Year:",
      worldCup: "World Cup:",
      euro: "European Championship:",
      championsLeague: "Champions League:",
      ballonDor: "Ballon d'Or:",
      premierLeague: "Premier League:",
      laLiga: "La Liga:",
      serieA: "Serie A:",
      bundesliga: "Bundesliga:",
      ligue1: "Ligue 1:",
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
      highScoresTitle: "🏆 High Scores (Local)",
      highScoresNote: "Scores saved on this device only",
      noScoresYet: "No high scores yet. Be the first!",
      askQuestion: "Ask a yes/no question...",
      asking: "Ask",
      checking: "Checking...",
      tipsTitle: "Tips for asking questions:",
      tip1: "Ask about position (forward, midfielder, defender)",
      tip2: "Ask about clubs and league titles",
      tip3: "Ask about trophies (World Cup, Euro, Champions League)",
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
      points: "Points",
      won: "Won",
      notWon: "Did not win"
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
      birthYear: "Fødselsår:",
      worldCup: "VM:",
      euro: "EM:",
      championsLeague: "Champions League:",
      ballonDor: "Ballon d'Or:",
      premierLeague: "Premier League:",
      laLiga: "La Liga:",
      serieA: "Serie A:",
      bundesliga: "Bundesliga:",
      ligue1: "Ligue 1:",
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
      highScoresTitle: "🏆 Toppliste (Lokal)",
      highScoresNote: "Poeng lagres kun på denne enheten",
      noScoresYet: "Ingen på topplisten ennå. Vær den første!",
      askQuestion: "Still et ja/nei-spørsmål...",
      asking: "Still spørsmål",
      checking: "Sjekker...",
      tipsTitle: "Tips til spørsmål:",
      tip1: "Spør om posisjon (spiss, midtbane, forsvar)",
      tip2: "Spør om klubber og ligatitler",
      tip3: "Spør om trofeer (VM, EM, Champions League)",
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
      points: "Poeng",
      won: "Vunnet",
      notWon: "Ikke vunnet"
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
  // worldCup, euro, championsLeague, premierLeague, laLiga, serieA, bundesliga, ligue1, ballon
  const playerDatabase = {
    europe: {
      '1950-1960': [
        { name: 'Michel Platini', country: 'France', position: 'Midfielder', clubs: ['Juventus'], birthYear: 1955, worldCup: false, euro: true, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: true, height: 178, hair: 'dark', beard: false },
        { name: 'Karl-Heinz Rummenigge', country: 'Germany', position: 'Forward', clubs: ['Bayern Munich'], birthYear: 1955, worldCup: true, euro: true, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: false, serieA: true, bundesliga: true, ligue1: false, height: 182, hair: 'dark', beard: false },
        { name: 'Paolo Rossi', country: 'Italy', position: 'Forward', clubs: ['Juventus'], birthYear: 1956, worldCup: true, euro: false, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Zbigniew Boniek', country: 'Poland', position: 'Midfielder', clubs: ['Juventus', 'Roma'], birthYear: 1956, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Jean Tigana', country: 'France', position: 'Midfielder', clubs: ['Bordeaux'], birthYear: 1955, worldCup: false, euro: true, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 174, hair: 'dark', beard: false },
        { name: 'Kenny Dalglish', country: 'Scotland', position: 'Forward', clubs: ['Liverpool'], birthYear: 1951, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Kevin Keegan', country: 'England', position: 'Forward', clubs: ['Liverpool', 'Hamburg'], birthYear: 1951, worldCup: false, euro: false, championsLeague: true, ballonDor: true, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Bryan Robson', country: 'England', position: 'Midfielder', clubs: ['Manchester United'], birthYear: 1957, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Preben Elkjær', country: 'Denmark', position: 'Forward', clubs: ['Verona'], birthYear: 1957, worldCup: false, euro: true, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Igor Belanov', country: 'Ukraine', position: 'Forward', clubs: ['Dynamo Kyiv'], birthYear: 1960, worldCup: false, euro: false, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 179, hair: 'dark', beard: false }
      ],
      '1960-1970': [
        { name: 'Ruud Gullit', country: 'Netherlands', position: 'Midfielder', clubs: ['AC Milan', 'Chelsea'], birthYear: 1962, worldCup: false, euro: true, championsLeague: true, ballonDor: true, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 191, hair: 'dark', beard: false },
        { name: 'Marco van Basten', country: 'Netherlands', position: 'Forward', clubs: ['AC Milan'], birthYear: 1964, worldCup: false, euro: true, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 188, hair: 'blonde', beard: false },
        { name: 'Frank Rijkaard', country: 'Netherlands', position: 'Midfielder', clubs: ['AC Milan'], birthYear: 1962, worldCup: false, euro: true, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 190, hair: 'dark', beard: false },
        { name: 'Roberto Baggio', country: 'Italy', position: 'Forward', clubs: ['Juventus', 'AC Milan'], birthYear: 1967, worldCup: false, euro: false, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 174, hair: 'dark', beard: false },
        { name: 'Lothar Matthäus', country: 'Germany', position: 'Midfielder', clubs: ['Bayern Munich', 'Inter Milan'], birthYear: 1961, worldCup: true, euro: true, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: false, serieA: true, bundesliga: true, ligue1: false, height: 174, hair: 'dark', beard: false },
        { name: 'Gary Lineker', country: 'England', position: 'Forward', clubs: ['Barcelona', 'Tottenham'], birthYear: 1960, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Jean-Pierre Papin', country: 'France', position: 'Forward', clubs: ['Marseille', 'AC Milan'], birthYear: 1963, worldCup: false, euro: false, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 173, hair: 'dark', beard: false },
        { name: 'Matthias Sammer', country: 'Germany', position: 'Defender', clubs: ['Borussia Dortmund'], birthYear: 1967, worldCup: false, euro: true, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 182, hair: 'blonde', beard: false },
        { name: 'Hristo Stoichkov', country: 'Bulgaria', position: 'Forward', clubs: ['Barcelona'], birthYear: 1966, worldCup: false, euro: false, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 178, hair: 'dark', beard: false },
        { name: 'Paul Gascoigne', country: 'England', position: 'Midfielder', clubs: ['Tottenham', 'Lazio'], birthYear: 1967, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 178, hair: 'dark', beard: false },
        { name: 'Alan Shearer', country: 'England', position: 'Forward', clubs: ['Blackburn Rovers', 'Newcastle'], birthYear: 1970, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false }
      ],
      '1970-1980': [
        { name: 'Zinedine Zidane', country: 'France', position: 'Midfielder', clubs: ['Juventus', 'Real Madrid'], birthYear: 1972, worldCup: true, euro: true, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 185, hair: 'bald', beard: false },
        { name: 'Thierry Henry', country: 'France', position: 'Forward', clubs: ['Arsenal', 'Barcelona'], birthYear: 1977, worldCup: true, euro: true, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 188, hair: 'dark', beard: false },
        { name: 'Pavel Nedvěd', country: 'Czech Republic', position: 'Midfielder', clubs: ['Juventus'], birthYear: 1972, worldCup: false, euro: false, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 177, hair: 'blonde', beard: false },
        { name: 'Raúl', country: 'Spain', position: 'Forward', clubs: ['Real Madrid'], birthYear: 1977, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Andriy Shevchenko', country: 'Ukraine', position: 'Forward', clubs: ['AC Milan', 'Chelsea'], birthYear: 1976, worldCup: false, euro: false, championsLeague: true, ballonDor: true, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 183, hair: 'dark', beard: false },
        { name: 'Michael Owen', country: 'England', position: 'Forward', clubs: ['Liverpool', 'Real Madrid'], birthYear: 1979, worldCup: false, euro: false, championsLeague: false, ballonDor: true, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Francesco Totti', country: 'Italy', position: 'Forward', clubs: ['Roma'], birthYear: 1976, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Andrea Pirlo', country: 'Italy', position: 'Midfielder', clubs: ['AC Milan', 'Juventus'], birthYear: 1979, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 177, hair: 'dark', beard: true },
        { name: 'Frank Lampard', country: 'England', position: 'Midfielder', clubs: ['Chelsea'], birthYear: 1978, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 184, hair: 'dark', beard: false },
        { name: 'Steven Gerrard', country: 'England', position: 'Midfielder', clubs: ['Liverpool'], birthYear: 1980, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 183, hair: 'dark', beard: false },
        { name: 'Xavi', country: 'Spain', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 1980, worldCup: true, euro: true, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 170, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Cristiano Ronaldo', country: 'Portugal', position: 'Forward', clubs: ['Manchester United', 'Real Madrid'], birthYear: 1985, worldCup: false, euro: true, championsLeague: true, ballonDor: true, premierLeague: true, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 187, hair: 'dark', beard: false },
        { name: 'Luka Modrić', country: 'Croatia', position: 'Midfielder', clubs: ['Tottenham', 'Real Madrid'], birthYear: 1985, worldCup: false, euro: false, championsLeague: true, ballonDor: true, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 172, hair: 'light', beard: false },
        { name: 'Andrés Iniesta', country: 'Spain', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 1984, worldCup: true, euro: true, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 171, hair: 'dark', beard: false },
        { name: 'Sergio Ramos', country: 'Spain', position: 'Defender', clubs: ['Real Madrid', 'PSG'], birthYear: 1986, worldCup: true, euro: true, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: true, height: 184, hair: 'dark', beard: true },
        { name: 'Manuel Neuer', country: 'Germany', position: 'Goalkeeper', clubs: ['Bayern Munich'], birthYear: 1986, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 193, hair: 'blonde', beard: false },
        { name: 'Wayne Rooney', country: 'England', position: 'Forward', clubs: ['Manchester United'], birthYear: 1985, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 176, hair: 'dark', beard: false },
        { name: 'Mesut Özil', country: 'Germany', position: 'Midfielder', clubs: ['Real Madrid', 'Arsenal'], birthYear: 1988, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Zlatan Ibrahimović', country: 'Sweden', position: 'Forward', clubs: ['Juventus', 'Barcelona', 'AC Milan', 'PSG', 'Manchester United'], birthYear: 1981, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: true, bundesliga: false, ligue1: true, height: 195, hair: 'dark', beard: false },
        { name: 'Robert Lewandowski', country: 'Poland', position: 'Forward', clubs: ['Borussia Dortmund', 'Bayern Munich'], birthYear: 1988, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 185, hair: 'dark', beard: false },
        { name: 'Thomas Müller', country: 'Germany', position: 'Forward', clubs: ['Bayern Munich'], birthYear: 1989, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 186, hair: 'dark', beard: false },
        { name: 'Toni Kroos', country: 'Germany', position: 'Midfielder', clubs: ['Bayern Munich', 'Real Madrid'], birthYear: 1990, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: true, ligue1: false, height: 183, hair: 'dark', beard: false },
        { name: 'Cesc Fàbregas', country: 'Spain', position: 'Midfielder', clubs: ['Arsenal', 'Barcelona', 'Chelsea'], birthYear: 1987, worldCup: true, euro: true, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: true },
        { name: 'Gerard Piqué', country: 'Spain', position: 'Defender', clubs: ['Barcelona', 'Manchester United'], birthYear: 1987, worldCup: true, euro: true, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 194, hair: 'dark', beard: false },
        { name: 'David Silva', country: 'Spain', position: 'Midfielder', clubs: ['Manchester City'], birthYear: 1986, worldCup: true, euro: true, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 170, hair: 'dark', beard: true }
      ],
      '1990-2000': [
        { name: 'Kevin De Bruyne', country: 'Belgium', position: 'Midfielder', clubs: ['Manchester City'], birthYear: 1991, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 181, hair: 'ginger', beard: false },
        { name: 'Harry Kane', country: 'England', position: 'Forward', clubs: ['Tottenham', 'Bayern Munich'], birthYear: 1993, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 188, hair: 'dark', beard: false },
        { name: 'Kylian Mbappé', country: 'France', position: 'Forward', clubs: ['PSG', 'Real Madrid'], birthYear: 1998, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: true, height: 178, hair: 'dark', beard: false },
        { name: 'Martin Ødegaard', country: 'Norway', position: 'Midfielder', clubs: ['Real Madrid', 'Arsenal'], birthYear: 1998, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 178, hair: 'blonde', beard: true },
        { name: 'Thibaut Courtois', country: 'Belgium', position: 'Goalkeeper', clubs: ['Chelsea', 'Real Madrid'], birthYear: 1992, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 199, hair: 'dark', beard: false },
        { name: 'N\'Golo Kanté', country: 'France', position: 'Midfielder', clubs: ['Leicester City', 'Chelsea'], birthYear: 1991, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 168, hair: 'dark', beard: false },
        { name: 'Antoine Griezmann', country: 'France', position: 'Forward', clubs: ['Atletico Madrid', 'Barcelona'], birthYear: 1991, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 176, hair: 'blonde', beard: false },
        { name: 'Eden Hazard', country: 'Belgium', position: 'Forward', clubs: ['Chelsea', 'Real Madrid'], birthYear: 1991, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Jan Oblak', country: 'Slovenia', position: 'Goalkeeper', clubs: ['Atletico Madrid'], birthYear: 1993, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 188, hair: 'dark', beard: false },
        { name: 'Raheem Sterling', country: 'England', position: 'Forward', clubs: ['Liverpool', 'Manchester City', 'Chelsea'], birthYear: 1994, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 170, hair: 'dark', beard: false },
        { name: 'Paul Pogba', country: 'France', position: 'Midfielder', clubs: ['Juventus', 'Manchester United'], birthYear: 1993, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 191, hair: 'dark', beard: false },
        { name: 'Romelu Lukaku', country: 'Belgium', position: 'Forward', clubs: ['Chelsea', 'Inter Milan', 'Manchester United'], birthYear: 1993, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 191, hair: 'dark', beard: false }
      ],
      '2000-2010': [
        { name: 'Erling Haaland', country: 'Norway', position: 'Forward', clubs: ['Borussia Dortmund', 'Manchester City'], birthYear: 2000, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 194, hair: 'blonde', beard: false },
        { name: 'Jude Bellingham', country: 'England', position: 'Midfielder', clubs: ['Borussia Dortmund', 'Real Madrid'], birthYear: 2003, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: true, ligue1: false, height: 186, hair: 'dark', beard: false },
        { name: 'Phil Foden', country: 'England', position: 'Midfielder', clubs: ['Manchester City'], birthYear: 2000, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 171, hair: 'blonde', beard: false },
        { name: 'Jamal Musiala', country: 'Germany', position: 'Midfielder', clubs: ['Bayern Munich'], birthYear: 2003, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 183, hair: 'dark', beard: false },
        { name: 'Bukayo Saka', country: 'England', position: 'Forward', clubs: ['Arsenal'], birthYear: 2001, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 178, hair: 'dark', beard: false },
        { name: 'Florian Wirtz', country: 'Germany', position: 'Midfielder', clubs: ['Bayer Leverkusen'], birthYear: 2003, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 176, hair: 'dark', beard: false },
        { name: 'Pedri', country: 'Spain', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 2002, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 174, hair: 'dark', beard: false },
        { name: 'Gavi', country: 'Spain', position: 'Midfielder', clubs: ['Barcelona'], birthYear: 2004, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Eduardo Camavinga', country: 'France', position: 'Midfielder', clubs: ['Real Madrid'], birthYear: 2002, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 182, hair: 'dark', beard: false },
        { name: 'Warren Zaïre-Emery', country: 'France', position: 'Midfielder', clubs: ['PSG'], birthYear: 2006, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 175, hair: 'dark', beard: false }
      ]
    },
    'south-america': {
      '1950-1960': [
        { name: 'Diego Maradona', country: 'Argentina', position: 'Forward', clubs: ['Barcelona', 'Napoli'], birthYear: 1960, worldCup: true, euro: false, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 165, hair: 'dark', beard: false },
        { name: 'Sócrates', country: 'Brazil', position: 'Midfielder', clubs: ['Corinthians'], birthYear: 1954, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 192, hair: 'dark', beard: true },
        { name: 'Zico', country: 'Brazil', position: 'Midfielder', clubs: ['Flamengo', 'Udinese'], birthYear: 1953, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 172, hair: 'dark', beard: false },
        { name: 'Falcão', country: 'Brazil', position: 'Midfielder', clubs: ['Roma'], birthYear: 1953, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 177, hair: 'dark', beard: false },
        { name: 'Careca', country: 'Brazil', position: 'Forward', clubs: ['Napoli'], birthYear: 1960, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 172, hair: 'bald', beard: false },
        { name: 'Enzo Francescoli', country: 'Uruguay', position: 'Midfielder', clubs: ['River Plate', 'Marseille'], birthYear: 1961, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 179, hair: 'dark', beard: false },
        { name: 'Mario Kempes', country: 'Argentina', position: 'Forward', clubs: ['Valencia'], birthYear: 1954, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 176, hair: 'dark', beard: false },
        { name: 'Jairzinho', country: 'Brazil', position: 'Forward', clubs: ['Botafogo', 'Marseille'], birthYear: 1944, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Teófilo Cubillas', country: 'Peru', position: 'Midfielder', clubs: ['FC Porto'], birthYear: 1949, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false }
      ],
      '1960-1970': [
        { name: 'Romário', country: 'Brazil', position: 'Forward', clubs: ['PSV', 'Barcelona'], birthYear: 1966, worldCup: true, euro: false, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 167, hair: 'dark', beard: false },
        { name: 'Gabriel Batistuta', country: 'Argentina', position: 'Forward', clubs: ['Fiorentina', 'Roma'], birthYear: 1969, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 185, hair: 'dark', beard: false },
        { name: 'Carlos Valderrama', country: 'Colombia', position: 'Midfielder', clubs: ['Montpellier'], birthYear: 1961, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 175, hair: 'blonde', beard: false },
        { name: 'Claudio Caniggia', country: 'Argentina', position: 'Forward', clubs: ['Atalanta', 'Roma'], birthYear: 1967, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 175, hair: 'blonde', beard: false },
        { name: 'Bebeto', country: 'Brazil', position: 'Forward', clubs: ['Deportivo'], birthYear: 1964, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Jorginho', country: 'Brazil', position: 'Midfielder', clubs: ['Bayern Munich'], birthYear: 1964, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 185, hair: 'dark', beard: false },
        { name: 'Iván Zamorano', country: 'Chile', position: 'Forward', clubs: ['Real Madrid', 'Inter Milan'], birthYear: 1967, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 178, hair: 'dark', beard: false },
        { name: 'Marcelo Salas', country: 'Chile', position: 'Forward', clubs: ['Lazio', 'Juventus'], birthYear: 1974, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 174, hair: 'dark', beard: false },
        { name: 'Claudio Taffarel', country: 'Brazil', position: 'Goalkeeper', clubs: ['Parma'], birthYear: 1966, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Cafú', country: 'Brazil', position: 'Defender', clubs: ['Roma', 'AC Milan'], birthYear: 1970, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 176, hair: 'bald', beard: false }
      ],
      '1970-1980': [
        { name: 'Ronaldo Nazário', country: 'Brazil', position: 'Forward', clubs: ['Barcelona', 'Inter Milan', 'Real Madrid'], birthYear: 1976, worldCup: true, euro: false, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 183, hair: 'dark', beard: false },
        { name: 'Rivaldo', country: 'Brazil', position: 'Forward', clubs: ['Barcelona'], birthYear: 1972, worldCup: true, euro: false, championsLeague: false, ballonDor: true, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 186, hair: 'dark', beard: false },
        { name: 'Ronaldinho', country: 'Brazil', position: 'Forward', clubs: ['Barcelona', 'AC Milan'], birthYear: 1980, worldCup: true, euro: false, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 181, hair: 'dark', beard: false },
        { name: 'Juan Román Riquelme', country: 'Argentina', position: 'Midfielder', clubs: ['Barcelona', 'Villarreal'], birthYear: 1978, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 182, hair: 'dark', beard: false },
        { name: 'Hernán Crespo', country: 'Argentina', position: 'Forward', clubs: ['Parma', 'Inter Milan', 'Chelsea'], birthYear: 1975, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 184, hair: 'dark', beard: false },
        { name: 'Adriano', country: 'Brazil', position: 'Forward', clubs: ['Inter Milan'], birthYear: 1982, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 189, hair: 'dark', beard: false },
        { name: 'Roberto Carlos', country: 'Brazil', position: 'Defender', clubs: ['Real Madrid'], birthYear: 1973, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 168, hair: 'dark', beard: false },
        { name: 'Javier Saviola', country: 'Argentina', position: 'Forward', clubs: ['Barcelona', 'Real Madrid'], birthYear: 1981, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 168, hair: 'dark', beard: false },
        { name: 'Kaká', country: 'Brazil', position: 'Midfielder', clubs: ['AC Milan', 'Real Madrid'], birthYear: 1982, worldCup: true, euro: false, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 186, hair: 'dark', beard: false },
        { name: 'Robinho', country: 'Brazil', position: 'Forward', clubs: ['Real Madrid', 'Manchester City'], birthYear: 1984, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 172, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Lionel Messi', country: 'Argentina', position: 'Forward', clubs: ['Barcelona', 'PSG', 'Inter Miami'], birthYear: 1987, worldCup: true, euro: false, championsLeague: true, ballonDor: true, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: true, height: 170, hair: 'dark', beard: true },
        { name: 'Luis Suárez', country: 'Uruguay', position: 'Forward', clubs: ['Liverpool', 'Barcelona'], birthYear: 1987, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 182, hair: 'dark', beard: true },
        { name: 'Sergio Agüero', country: 'Argentina', position: 'Forward', clubs: ['Manchester City', 'Barcelona'], birthYear: 1988, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Alexis Sánchez', country: 'Chile', position: 'Forward', clubs: ['Barcelona', 'Arsenal'], birthYear: 1988, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 169, hair: 'dark', beard: false },
        { name: 'James Rodríguez', country: 'Colombia', position: 'Midfielder', clubs: ['Real Madrid', 'Bayern Munich'], birthYear: 1991, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: true, ligue1: false, height: 180, hair: 'dark', beard: true },
        { name: 'Arturo Vidal', country: 'Chile', position: 'Midfielder', clubs: ['Juventus', 'Bayern Munich', 'Barcelona'], birthYear: 1987, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: true, bundesliga: true, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Radamel Falcao', country: 'Colombia', position: 'Forward', clubs: ['Atletico Madrid', 'Monaco'], birthYear: 1986, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: true, height: 177, hair: 'dark', beard: false },
        { name: 'Ángel Di María', country: 'Argentina', position: 'Midfielder', clubs: ['Real Madrid', 'Manchester United', 'PSG'], birthYear: 1988, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: true, height: 180, hair: 'dark', beard: false },
        { name: 'Paulo Dybala', country: 'Argentina', position: 'Forward', clubs: ['Juventus', 'Roma'], birthYear: 1993, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 177, hair: 'dark', beard: true },
        { name: 'Edinson Cavani', country: 'Uruguay', position: 'Forward', clubs: ['Napoli', 'PSG', 'Manchester United'], birthYear: 1987, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: true, height: 184, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Neymar', country: 'Brazil', position: 'Forward', clubs: ['Barcelona', 'PSG'], birthYear: 1992, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: true, height: 175, hair: 'dark', beard: false },
        { name: 'Vinícius Júnior', country: 'Brazil', position: 'Forward', clubs: ['Real Madrid'], birthYear: 2000, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 176, hair: 'dark', beard: false },
        { name: 'Rodrygo', country: 'Brazil', position: 'Forward', clubs: ['Real Madrid'], birthYear: 2001, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 174, hair: 'dark', beard: false },
        { name: 'Lautaro Martínez', country: 'Argentina', position: 'Forward', clubs: ['Inter Milan'], birthYear: 1997, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 174, hair: 'dark', beard: false },
        { name: 'Julián Álvarez', country: 'Argentina', position: 'Forward', clubs: ['Manchester City'], birthYear: 2000, worldCup: true, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 170, hair: 'dark', beard: false },
        { name: 'Éder Militão', country: 'Brazil', position: 'Defender', clubs: ['Real Madrid'], birthYear: 1998, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 186, hair: 'dark', beard: false },
        { name: 'Alisson Becker', country: 'Brazil', position: 'Goalkeeper', clubs: ['Roma', 'Liverpool'], birthYear: 1992, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 193, hair: 'dark', beard: true },
        { name: 'Casemiro', country: 'Brazil', position: 'Midfielder', clubs: ['Real Madrid', 'Manchester United'], birthYear: 1992, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 185, hair: 'dark', beard: false },
        { name: 'Marquinhos', country: 'Brazil', position: 'Defender', clubs: ['PSG'], birthYear: 1994, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 183, hair: 'dark', beard: false },
        { name: 'Federico Valverde', country: 'Uruguay', position: 'Midfielder', clubs: ['Real Madrid'], birthYear: 1998, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 182, hair: 'dark', beard: false }
      ],
      '2000-2010': [
        { name: 'Endrick', country: 'Brazil', position: 'Forward', clubs: ['Real Madrid'], birthYear: 2006, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Enzo Fernández', country: 'Argentina', position: 'Midfielder', clubs: ['Chelsea'], birthYear: 2001, worldCup: true, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 178, hair: 'dark', beard: false },
        { name: 'Alejandro Garnacho', country: 'Argentina', position: 'Forward', clubs: ['Manchester United'], birthYear: 2004, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false }
      ]
    },
    africa: {
      '1960-1970': [
        { name: 'George Weah', country: 'Liberia', position: 'Forward', clubs: ['AC Milan', 'PSG', 'Chelsea'], birthYear: 1966, worldCup: false, euro: false, championsLeague: true, ballonDor: true, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: true, height: 185, hair: 'dark', beard: false },
        { name: 'Abedi Pele', country: 'Ghana', position: 'Forward', clubs: ['Marseille'], birthYear: 1964, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 175, hair: 'dark', beard: false },
        { name: 'Roger Milla', country: 'Cameroon', position: 'Forward', clubs: ['Monaco'], birthYear: 1952, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 176, hair: 'dark', beard: false }
      ],
      '1970-1980': [
        { name: 'Jay-Jay Okocha', country: 'Nigeria', position: 'Midfielder', clubs: ['PSG', 'Bolton'], birthYear: 1973, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 173, hair: 'dark', beard: false },
        { name: 'Nwankwo Kanu', country: 'Nigeria', position: 'Forward', clubs: ['Ajax', 'Inter Milan', 'Arsenal'], birthYear: 1976, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 197, hair: 'dark', beard: false },
        { name: 'Didier Drogba', country: 'Ivory Coast', position: 'Forward', clubs: ['Chelsea'], birthYear: 1978, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 188, hair: 'bald', beard: false },
        { name: 'Samuel Eto\'o', country: 'Cameroon', position: 'Forward', clubs: ['Barcelona', 'Inter Milan'], birthYear: 1981, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: true, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Michael Essien', country: 'Ghana', position: 'Midfielder', clubs: ['Chelsea', 'Real Madrid'], birthYear: 1982, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 178, hair: 'dark', beard: false },
        { name: 'Emmanuel Adebayor', country: 'Togo', position: 'Forward', clubs: ['Arsenal', 'Manchester City'], birthYear: 1984, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 191, hair: 'dark', beard: false },
        { name: 'Yaya Touré', country: 'Ivory Coast', position: 'Midfielder', clubs: ['Barcelona', 'Manchester City'], birthYear: 1983, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 188, hair: 'bald', beard: false },
        { name: 'Sulley Muntari', country: 'Ghana', position: 'Midfielder', clubs: ['Inter Milan', 'AC Milan'], birthYear: 1984, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 178, hair: 'dark', beard: false },
        { name: 'John Obi Mikel', country: 'Nigeria', position: 'Midfielder', clubs: ['Chelsea'], birthYear: 1987, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 188, hair: 'dark', beard: false },
        { name: 'Asamoah Gyan', country: 'Ghana', position: 'Forward', clubs: ['Sunderland', 'Udinese'], birthYear: 1985, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 185, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Mohamed Salah', country: 'Egypt', position: 'Forward', clubs: ['Chelsea', 'Roma', 'Liverpool'], birthYear: 1992, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: true },
        { name: 'Riyad Mahrez', country: 'Algeria', position: 'Forward', clubs: ['Leicester City', 'Manchester City'], birthYear: 1991, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 179, hair: 'dark', beard: true },
        { name: 'Sadio Mané', country: 'Senegal', position: 'Forward', clubs: ['Liverpool', 'Bayern Munich'], birthYear: 1992, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Pierre-Emerick Aubameyang', country: 'Gabon', position: 'Forward', clubs: ['Borussia Dortmund', 'Arsenal'], birthYear: 1989, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 187, hair: 'dark', beard: false },
        { name: 'Naby Keïta', country: 'Guinea', position: 'Midfielder', clubs: ['RB Leipzig', 'Liverpool'], birthYear: 1995, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 172, hair: 'dark', beard: false },
        { name: 'Wilfried Zaha', country: 'Ivory Coast', position: 'Forward', clubs: ['Manchester United', 'Crystal Palace'], birthYear: 1992, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Thomas Partey', country: 'Ghana', position: 'Midfielder', clubs: ['Atletico Madrid', 'Arsenal'], birthYear: 1993, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 185, hair: 'dark', beard: false },
        { name: 'Kalidou Koulibaly', country: 'Senegal', position: 'Defender', clubs: ['Napoli', 'Chelsea'], birthYear: 1991, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 187, hair: 'bald', beard: false },
        { name: 'Hakim Ziyech', country: 'Morocco', position: 'Midfielder', clubs: ['Ajax', 'Chelsea'], birthYear: 1993, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 180, hair: 'dark', beard: false },
        { name: 'Nicolas Pépé', country: 'Ivory Coast', position: 'Forward', clubs: ['Lille', 'Arsenal'], birthYear: 1995, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: true, height: 183, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Victor Osimhen', country: 'Nigeria', position: 'Forward', clubs: ['Napoli'], birthYear: 1998, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 185, hair: 'dark', beard: false },
        { name: 'Achraf Hakimi', country: 'Morocco', position: 'Defender', clubs: ['Inter Milan', 'PSG'], birthYear: 1998, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: true, height: 181, hair: 'dark', beard: false },
        { name: 'Sofyan Amrabat', country: 'Morocco', position: 'Midfielder', clubs: ['Fiorentina', 'Manchester United'], birthYear: 1996, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 183, hair: 'dark', beard: true }
      ]
    },
    asia: {
      '1970-1980': [
        { name: 'Park Ji-sung', country: 'South Korea', position: 'Midfielder', clubs: ['PSV', 'Manchester United'], birthYear: 1981, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Hidetoshi Nakata', country: 'Japan', position: 'Midfielder', clubs: ['Roma', 'Parma'], birthYear: 1977, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Shinji Kagawa', country: 'Japan', position: 'Midfielder', clubs: ['Borussia Dortmund', 'Manchester United'], birthYear: 1989, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 175, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Son Heung-min', country: 'South Korea', position: 'Forward', clubs: ['Bayer Leverkusen', 'Tottenham'], birthYear: 1992, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 183, hair: 'dark', beard: false },
        { name: 'Shinji Okazaki', country: 'Japan', position: 'Forward', clubs: ['Leicester City'], birthYear: 1986, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 174, hair: 'dark', beard: false },
        { name: 'Ki Sung-yueng', country: 'South Korea', position: 'Midfielder', clubs: ['Swansea City', 'Newcastle'], birthYear: 1989, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: false, ligue1: false, height: 186, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Takefusa Kubo', country: 'Japan', position: 'Forward', clubs: ['Real Madrid', 'Real Sociedad'], birthYear: 2001, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 173, hair: 'dark', beard: false },
        { name: 'Lee Kang-in', country: 'South Korea', position: 'Midfielder', clubs: ['Valencia', 'PSG'], birthYear: 2001, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: true, height: 173, hair: 'dark', beard: false },
        { name: 'Hwang Hee-chan', country: 'South Korea', position: 'Forward', clubs: ['RB Leipzig', 'Wolverhampton'], birthYear: 1996, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 177, hair: 'dark', beard: false }
      ]
    },
    'north-america': {
      '1950-1960': [
        { name: 'Hugo Sánchez', country: 'Mexico', position: 'Forward', clubs: ['Real Madrid', 'Atletico Madrid'], birthYear: 1958, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false }
      ],
      '1970-1980': [
        { name: 'Rafael Márquez', country: 'Mexico', position: 'Defender', clubs: ['Barcelona'], birthYear: 1979, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 182, hair: 'dark', beard: false },
        { name: 'Cuauhtémoc Blanco', country: 'Mexico', position: 'Forward', clubs: ['Valladolid'], birthYear: 1973, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 176, hair: 'dark', beard: false }
      ],
      '1980-1990': [
        { name: 'Javier Hernández', country: 'Mexico', position: 'Forward', clubs: ['Manchester United', 'Real Madrid'], birthYear: 1988, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Carlos Vela', country: 'Mexico', position: 'Forward', clubs: ['Arsenal', 'Real Sociedad'], birthYear: 1989, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 177, hair: 'dark', beard: true },
        { name: 'Giovani dos Santos', country: 'Mexico', position: 'Forward', clubs: ['Barcelona', 'Tottenham'], birthYear: 1989, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: true, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 170, hair: 'dark', beard: false },
        { name: 'Andrés Guardado', country: 'Mexico', position: 'Midfielder', clubs: ['Valencia', 'PSV'], birthYear: 1986, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: true, serieA: false, bundesliga: false, ligue1: false, height: 169, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Alphonso Davies', country: 'Canada', position: 'Defender', clubs: ['Bayern Munich'], birthYear: 2000, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: false, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 183, hair: 'dark', beard: false },
        { name: 'Hirving Lozano', country: 'Mexico', position: 'Forward', clubs: ['PSV', 'Napoli'], birthYear: 1995, worldCup: false, euro: false, championsLeague: false, ballonDor: false, premierLeague: false, laLiga: false, serieA: true, bundesliga: false, ligue1: false, height: 175, hair: 'dark', beard: false },
        { name: 'Christian Pulisic', country: 'USA', position: 'Forward', clubs: ['Borussia Dortmund', 'Chelsea'], birthYear: 1998, worldCup: false, euro: false, championsLeague: true, ballonDor: false, premierLeague: true, laLiga: false, serieA: false, bundesliga: true, ligue1: false, height: 173, hair: 'dark', beard: false }
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
      const leagueMap = {
        'premier-league': 'premierLeague',
        'la-liga': 'laLiga',
        'serie-a': 'serieA',
        'bundesliga': 'bundesliga',
        'ligue-1': 'ligue1'
      };
      const leagueKey = leagueMap[selectedLeague];
      allPlayers = allPlayers.filter(p => p[leagueKey] === true);
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
    let counted = true;

    // Position checks
    if (q.includes('forward') || q.includes('striker') || q.includes('attacker') || q.includes('spiss')) {
      answer = currentPlayer.position === 'Forward' ? t.yes : t.no;
    } else if (q.includes('midfielder') || q.includes('midfield') || q.includes('midtbane')) {
      answer = currentPlayer.position === 'Midfielder' ? t.yes : t.no;
    } else if (q.includes('defender') || q.includes('defence') || q.includes('defense') || q.includes('forsvar')) {
      answer = currentPlayer.position === 'Defender' ? t.yes : t.no;
    } else if (q.includes('goalkeeper') || q.includes('keeper') || q.includes('målvakt')) {
      answer = currentPlayer.position === 'Goalkeeper' ? t.yes : t.no;
    }
    
    // Birth year checks
    else if (q.includes('born before') || q.includes('født før')) {
      const yearMatch = q.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        answer = currentPlayer.birthYear < year ? t.yes : t.no;
      } else {
        counted = false;
      }
    } else if (q.includes('born after') || q.includes('født etter')) {
      const yearMatch = q.match(/\d{4}/);
      if (yearMatch) {
        const year = parseInt(yearMatch[0]);
        answer = currentPlayer.birthYear > year ? t.yes : t.no;
      } else {
        counted = false;
      }
    }
    
    // Trophy checks - NO EXPLANATION
    else if (q.includes('world cup') || q.includes('vm')) {
      answer = currentPlayer.worldCup ? t.yes : t.no;
    } else if (q.includes('euro') || q.includes('em') || q.includes('european championship')) {
      answer = currentPlayer.euro ? t.yes : t.no;
    } else if (q.includes('champions league')) {
      answer = currentPlayer.championsLeague ? t.yes : t.no;
    } else if (q.includes('ballon')) {
      answer = currentPlayer.ballonDor ? t.yes : t.no;
    }
    
    // League title checks
    else if (q.includes('premier league')) {
      answer = currentPlayer.premierLeague ? t.yes : t.no;
    } else if (q.includes('la liga') || (q.includes('spanish') && q.includes('league'))) {
      answer = currentPlayer.laLiga ? t.yes : t.no;
    } else if (q.includes('serie a') || (q.includes('italian') && q.includes('league'))) {
      answer = currentPlayer.serieA ? t.yes : t.no;
    } else if (q.includes('bundesliga') || (q.includes('german') && q.includes('league'))) {
      answer = currentPlayer.bundesliga ? t.yes : t.no;
    } else if (q.includes('ligue 1') || q.includes('ligue 1') || (q.includes('french') && q.includes('league'))) {
      answer = currentPlayer.ligue1 ? t.yes : t.no;
    }
    
    // Height checks
    else if (q.includes('tall') || q.includes('høy') || q.includes('height') || q.includes('over 180') || q.includes('over 185') || q.includes('under 175')) {
      if (q.includes('over 185') || q.includes('over 190')) {
        answer = currentPlayer.height > 185 ? t.yes : t.no;
      } else if (q.includes('over 180')) {
        answer = currentPlayer.height > 180 ? t.yes : t.no;
      } else if (q.includes('under 175') || q.includes('under 180')) {
        answer = currentPlayer.height < 175 ? t.yes : t.no;
      }
    } 
    
    // Appearance checks
    else if (q.includes('beard') || q.includes('skjegg')) {
      answer = currentPlayer.beard ? t.yes : t.no;
    } else if (q.includes('blonde') || q.includes('blond') || q.includes('light hair') || q.includes('lyst hår')) {
      answer = currentPlayer.hair === 'blonde' || currentPlayer.hair === 'light' || currentPlayer.hair === 'ginger' ? t.yes : t.no;
    } else if (q.includes('bald') || q.includes('skallet')) {
      answer = currentPlayer.hair === 'bald' ? t.yes : t.no;
    } else if (q.includes('dark hair') || q.includes('mørkt hår')) {
      answer = currentPlayer.hair === 'dark' ? t.yes : t.no;
    }
    
    // Club checks
    else if (q.includes('real madrid')) {
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
    }
    
    // Country checks
    else if (q.includes('brazil') || q.includes('brasil')) {
      answer = currentPlayer.country === 'Brazil' ? t.yes : t.no;
    } else if (q.includes('argentina')) {
      answer = currentPlayer.country === 'Argentina' ? t.yes : t.no;
    } else if (q.includes('portugal')) {
      answer = currentPlayer.country === 'Portugal' ? t.yes : t.no;
    } else if (q.includes('spain') || q.includes('spania')) {
      answer = currentPlayer.country === 'Spain' ? t.yes : t.no;
    } else if (q.includes('france') || q.includes('frankrike')) {
      answer = currentPlayer.country === 'France' ? t.yes : t.no;
    } else if (q.includes('england')) {
      answer = currentPlayer.country === 'England' ? t.yes : t.no;
    } else if (q.includes('germany') || q.includes('tyskland')) {
      answer = currentPlayer.country === 'Germany' ? t.yes : t.no;
    } else if (q.includes('italy') || q.includes('italia')) {
      answer = currentPlayer.country === 'Italy' ? t.yes : t.no;
    } else if (q.includes('norway') || q.includes('norge')) {
      answer = currentPlayer.country === 'Norway' ? t.yes : t.no;
    } else {
      answer = language === 'no' ? 'Kan ikke bekrefte' : 'Unable to verify';
      counted = false;
    }

    setIsVerifying(false);
    return { answer, counted };
  };

  const handleQuestionSubmit = async () => {
    if (!currentQuestion.trim() || remainingQuestions === 0 || isVerifying) return;

    const result = await verifyAnswer(currentQuestion);
    
    const newQuestion = {
      question: currentQuestion,
      answer: result.answer,
      counted: result.counted
    };
    
    setQuestions([newQuestion, ...questions]);
    setCurrentQuestion('');
    
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{t.highScoresTitle}</h3>
                  <p className="text-xs text-gray-600 text-center mb-4">{t.highScoresNote}</p>
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
              <div className="text-left space-y-2 text-sm">
                <p><strong>{t.country}</strong> {currentPlayer.country}</p>
                <p><strong>{t.position}</strong> {currentPlayer.position}</p>
                <p><strong>{t.birthYear}</strong> {currentPlayer.birthYear}</p>
                <p><strong>{t.clubs}</strong> {currentPlayer.clubs.join(', ')}</p>
                <p><strong>{t.height}</strong> {currentPlayer.height} {t.cm}</p>
                <p><strong>{t.worldCup}</strong> {currentPlayer.worldCup ? t.won : t.notWon}</p>
                {currentPlayer.euro !== undefined && <p><strong>{t.euro}</strong> {currentPlayer.euro ? t.won : t.notWon}</p>}
                <p><strong>{t.championsLeague}</strong> {currentPlayer.championsLeague ? t.won : t.notWon}</p>
                <p><strong>{t.ballonDor}</strong> {currentPlayer.ballonDor ? t.won : t.notWon}</p>
                <p><strong>{t.premierLeague}</strong> {currentPlayer.premierLeague ? t.won : t.notWon}</p>
                <p><strong>{t.laLiga}</strong> {currentPlayer.laLiga ? t.won : t.notWon}</p>
                <p><strong>{t.serieA}</strong> {currentPlayer.serieA ? t.won : t.notWon}</p>
                <p><strong>{t.bundesliga}</strong> {currentPlayer.bundesliga ? t.won : t.notWon}</p>
                <p><strong>{t.ligue1}</strong> {currentPlayer.ligue1 ? t.won : t.notWon}</p>
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
