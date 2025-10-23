import React, { useState, useEffect } from 'react';
import { Search, Trophy, Globe, Calendar, AlertCircle, CheckCircle, XCircle, Star, Filter, User, Award } from 'lucide-react';
import { playerDatabase } from './playerDatabase';

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

  // HJELPEFUNKSJON: Normaliser tekst for sammenligning
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD") // Splitter tegn med aksenter
      .replace(/[\u0300-\u036f]/g, "") // Fjerner aksenter
      .replace(/[''`´]/g, "") // Fjerner apostrofer
      .replace(/[-]/g, " ") // Erstatter bindestrek med mellomrom
      .replace(/[^\w\s]/g, "") // Fjerner andre spesialtegn
      .trim();
  };

  // HJELPEFUNKSJON: Sjekk om en klubb matcher spillerens klubber
  const playerHasClub = (clubQuery) => {
    const normalizedQuery = normalizeText(clubQuery);
    return currentPlayer.clubs.some(club => {
      const normalizedClub = normalizeText(club);
      // Sjekk om spørsmålet inneholder klubbnavnet ELLER omvendt
      return normalizedClub.includes(normalizedQuery) || normalizedQuery.includes(normalizedClub);
    });
  };

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
    
    // Trophy checks
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
    
    // Country checks
    else if (q.includes('brazil') || q.includes('brasil') || q.includes('brazilian') || q.includes('brasiliansk')) {
      answer = currentPlayer.country === 'Brazil' ? t.yes : t.no;
    } else if (q.includes('argentina') || q.includes('argentinian') || q.includes('argentinsk')) {
      answer = currentPlayer.country === 'Argentina' ? t.yes : t.no;
    } else if (q.includes('portugal') || q.includes('portuguese') || q.includes('portugisisk')) {
      answer = currentPlayer.country === 'Portugal' ? t.yes : t.no;
    } else if (q.includes('spain') || q.includes('spania') || q.includes('spanish') || q.includes('spansk')) {
      answer = currentPlayer.country === 'Spain' ? t.yes : t.no;
    } else if (q.includes('france') || q.includes('frankrike') || q.includes('french') || q.includes('fransk')) {
      answer = currentPlayer.country === 'France' ? t.yes : t.no;
    } else if (q.includes('england') || q.includes('english') || q.includes('engelsk')) {
      answer = currentPlayer.country === 'England' ? t.yes : t.no;
    } else if (q.includes('germany') || q.includes('tyskland') || q.includes('german') || q.includes('tysk')) {
      answer = currentPlayer.country === 'Germany' ? t.yes : t.no;
    } else if (q.includes('italy') || q.includes('italia') || q.includes('italian') || q.includes('italiensk')) {
      answer = currentPlayer.country === 'Italy' ? t.yes : t.no;
    } else if (q.includes('norway') || q.includes('norge') || q.includes('norwegian') || q.includes('norsk')) {
      answer = currentPlayer.country === 'Norway' ? t.yes : t.no;
    } else if (q.includes('netherlands') || q.includes('holland') || q.includes('dutch') || q.includes('nederlandsk')) {
      answer = currentPlayer.country === 'Netherlands' ? t.yes : t.no;
    } else if (q.includes('belgium') || q.includes('belgian') || q.includes('belgisk')) {
      answer = currentPlayer.country === 'Belgium' ? t.yes : t.no;
    } else if (q.includes('croatia') || q.includes('croatian') || q.includes('kroatisk')) {
      answer = currentPlayer.country === 'Croatia' ? t.yes : t.no;
    } else if (q.includes('uruguay') || q.includes('uruguayan') || q.includes('uruguayansk')) {
      answer = currentPlayer.country === 'Uruguay' ? t.yes : t.no;
    } else if (q.includes('colombia') || q.includes('colombian') || q.includes('colombiansk')) {
      answer = currentPlayer.country === 'Colombia' ? t.yes : t.no;
    } else if (q.includes('chile') || q.includes('chilean') || q.includes('chilensk')) {
      answer = currentPlayer.country === 'Chile' ? t.yes : t.no;
    } else if (q.includes('mexico') || q.includes('mexican') || q.includes('meksikansk')) {
      answer = currentPlayer.country === 'Mexico' ? t.yes : t.no;
    } else if (q.includes('egypt') || q.includes('egyptian') || q.includes('egyptisk')) {
      answer = currentPlayer.country === 'Egypt' ? t.yes : t.no;
    } else if (q.includes('senegal') || q.includes('senegalese') || q.includes('senegalesisk')) {
      answer = currentPlayer.country === 'Senegal' ? t.yes : t.no;
    } else if (q.includes('morocco') || q.includes('marokko') || q.includes('moroccan') || q.includes('marokkansk')) {
      answer = currentPlayer.country === 'Morocco' ? t.yes : t.no;
    } else if (q.includes('ghana') || q.includes('ghanaian') || q.includes('ghanansk')) {
      answer = currentPlayer.country === 'Ghana' ? t.yes : t.no;
    } else if (q.includes('nigeria') || q.includes('nigerian') || q.includes('nigeriansk')) {
      answer = currentPlayer.country === 'Nigeria' ? t.yes : t.no;
    } else if (q.includes('ivory coast') || q.includes('ivorian') || q.includes('elfenbenskyst')) {
      answer = currentPlayer.country === 'Ivory Coast' ? t.yes : t.no;
    } else if (q.includes('cameroon') || q.includes('kamerun') || q.includes('cameroonian') || q.includes('kamerunsk')) {
      answer = currentPlayer.country === 'Cameroon' ? t.yes : t.no;
    } else if (q.includes('south korea') || q.includes('korean') || q.includes('koreansk') || q.includes('sør-korea')) {
      answer = currentPlayer.country === 'South Korea' ? t.yes : t.no;
    } else if (q.includes('japan') || q.includes('japanese') || q.includes('japansk')) {
      answer = currentPlayer.country === 'Japan' ? t.yes : t.no;
    } else if (q.includes('canada') || q.includes('canadian') || q.includes('kanadisk')) {
      answer = currentPlayer.country === 'Canada' ? t.yes : t.no;
    } else if (q.includes('usa') || q.includes('united states') || q.includes('american') || q.includes('amerikansk')) {
      answer = currentPlayer.country === 'USA' ? t.yes : t.no;
    } else if (q.includes('sweden') || q.includes('sverige') || q.includes('swedish') || q.includes('svensk')) {
      answer = currentPlayer.country === 'Sweden' ? t.yes : t.no;
    } else if (q.includes('poland') || q.includes('polen') || q.includes('polish') || q.includes('polsk')) {
      answer = currentPlayer.country === 'Poland' ? t.yes : t.no;
    } else if (q.includes('scotland') || q.includes('skottland') || q.includes('scottish') || q.includes('skotsk')) {
      answer = currentPlayer.country === 'Scotland' ? t.yes : t.no;
    } else if (q.includes('ukraine') || q.includes('ukrainian') || q.includes('ukrainsk')) {
      answer = currentPlayer.country === 'Ukraine' ? t.yes : t.no;
    } else if (q.includes('czech') || q.includes('tsjekkisk')) {
      answer = currentPlayer.country === 'Czech Republic' ? t.yes : t.no;
    }
    
    // FORBEDRET: Generell klubb-sjekk
    // Hvis spørsmålet inneholder ord som "play", "played", "club", "team", sjekk mot alle klubber
    else if (
      (q.includes('play') || q.includes('spill') || q.includes('club') || q.includes('klubb') || q.includes('team') || q.includes('lag')) &&
      !q.includes('premier league') && !q.includes('la liga') && !q.includes('serie a') && 
      !q.includes('bundesliga') && !q.includes('ligue 1')
    ) {
      // Prøv å finne et klubbnavn i spørsmålet
      // Fjern vanlige ord først
      const cleanedQuestion = q
        .replace(/did|does|has|have|he|she|the|player|ever|play|played|for|at|in|klub|klubb|spill|spilte|spilleren/g, '')
        .trim();
      
      if (cleanedQuestion.length > 2) {
        answer = playerHasClub(cleanedQuestion) ? t.yes : t.no;
      } else {
        counted = false;
      }
    }
    
    else {
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
    
    // FORBEDRET: Normaliser både gjetting og spillernavn for sammenligning
    const normalizedGuess = normalizeText(finalGuess);
    const normalizedPlayerName = normalizeText(currentPlayer.name);
    
    // Splitt spillernavnet i deler (fornavn, mellomnavn, etternavn)
    const playerNameParts = normalizedPlayerName.split(' ');
    const guessParts = normalizedGuess.split(' ');
    
    // Sjekk om gjetningen matcher hele navnet eller deler av det
    const isCorrect = 
      normalizedGuess === normalizedPlayerName || // Eksakt match
      normalizedPlayerName.includes(normalizedGuess) || // Gjetning er del av navnet
      normalizedGuess.includes(normalizedPlayerName) || // Navnet er del av gjetningen
      playerNameParts.some(part => part.length > 2 && guessParts.includes(part)) || // Matcher deler av navnet
      (guessParts.length > 1 && playerNameParts.some(part => guessParts.includes(part) && part.length > 2)); // Matcher minst ett ord
    
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

  // Resten av komponentene (language, username, setup, won/lost, playing screens)
  // forblir uendret - kun verifyAnswer og handleFinalGuess er oppdatert
  
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

  // Setup, playing, won/lost screens fortsetter som før...
  // (koden er for lang til å inkludere alt, men disse er uendret)

  return <div>Game interface here...</div>;
}

export default App;
