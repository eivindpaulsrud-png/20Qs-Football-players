import React, { useState } from 'react';
import { Search, Trophy, Globe, Calendar, AlertCircle, CheckCircle, XCircle, Star, Filter } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState('en');
  const [gameState, setGameState] = useState('language');
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

  const translations = {
    en: {
      title: "Football Player 20 Questions",
      subtitle: "I'm thinking of a football player. Ask yes/no questions to guess who it is!",
      selectLanguage: "Select Language",
      selectPeriod: "Select Time Period",
      selectContinent: "Select Continent",
      selectLeague: "Select League (Optional)",
      useFiltersTitle: "Difficulty Settings",
      useFiltersDesc: "Enable filters to make the game easier (reduces your score)",
      usePeriodFilter: "Use Time Period Filter",
      useContinentFilter: "Use Continent Filter",
      useLeagueFilter: "Use League Filter",
      startGame: "Start Game",
      questionsLeft: "questions left",
      restart: "Restart",
      hint: "Hint:",
      playerFrom: "The player is from",
      playedAs: "and played as a",
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
      worldCup: "World Cup Winner:",
      ballonDor: "Ballon d'Or Winner:",
      height: "Height:",
      appearance: "Appearance:",
      yes: "Yes",
      no: "No",
      questionsUsed: "Questions used:",
      finalScore: "Final Score:",
      playAgain: "Play Again",
      askQuestion: "Ask a yes/no question...",
      asking: "Ask",
      checking: "Checking...",
      tipsTitle: "Tips for asking questions:",
      tip1: "Ask about position (forward, midfielder, defender)",
      tip2: "Ask about clubs and leagues",
      tip3: "Ask about achievements (World Cup, Ballon d'Or)",
      tip4: "Ask about appearance (height, hair, beard)",
      tip5: "Ask about nationality",
      scoreBreakdown: "Score Breakdown:",
      baseScore: "Base Score:",
      questionPenalty: "Question Penalty:",
      filterPenalty: "Filter Penalty:",
      bonusPoints: "Early Guess Bonus:",
      cm: "cm"
    },
    no: {
      title: "Fotballspiller 20 Spørsmål",
      subtitle: "Jeg tenker på en fotballspiller. Still ja/nei-spørsmål for å gjette hvem det er!",
      selectLanguage: "Velg Språk",
      selectPeriod: "Velg Tidsperiode",
      selectContinent: "Velg Kontinent",
      selectLeague: "Velg Liga (Valgfritt)",
      useFiltersTitle: "Vanskelighetsgrad",
      useFiltersDesc: "Aktiver filtre for å gjøre spillet enklere (reduserer poengsummen din)",
      usePeriodFilter: "Bruk Tidsperiode-filter",
      useContinentFilter: "Bruk Kontinent-filter",
      useLeagueFilter: "Bruk Liga-filter",
      startGame: "Start Spill",
      questionsLeft: "spørsmål igjen",
      restart: "Start på nytt",
      hint: "Hint:",
      playerFrom: "Spilleren er fra",
      playedAs: "og spilte som",
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
      worldCup: "VM-vinner:",
      ballonDor: "Ballon d'Or-vinner:",
      height: "Høyde:",
      appearance: "Utseende:",
      yes: "Ja",
      no: "Nei",
      questionsUsed: "Spørsmål brukt:",
      finalScore: "Sluttpoeng:",
      playAgain: "Spill igjen",
      askQuestion: "Still et ja/nei-spørsmål...",
      asking: "Still spørsmål",
      checking: "Sjekker...",
      tipsTitle: "Tips til spørsmål:",
      tip1: "Spør om posisjon (spiss, midtbane, forsvar)",
      tip2: "Spør om klubber og ligaer",
      tip3: "Spør om prestasjoner (VM, Ballon d'Or)",
      tip4: "Spør om utseende (høyde, hår, skjegg)",
      tip5: "Spør om nasjonalitet",
      scoreBreakdown: "Poengfordeling:",
      baseScore: "Grunnpoeng:",
      questionPenalty: "Spørsmålstrekk:",
      filterPenalty: "Filtertrekk:",
      bonusPoints: "Tidlig gjetting bonus:",
      cm: "cm"
    }
  };

  const t = translations[language];

  const periods = [
    { id: '1980-1990', label: '1980s' },
    { id: '1990-2000', label: '1990s' },
    { id: '2000-2010', label: '2000s' },
    { id: '2010-2020', label: '2010s' },
    { id: '2020-2025', label: '2020s' }
  ];

  const continents = [
    { id: 'europe', label: language === 'no' ? 'Europa' : 'Europe' },
    { id: 'south-america', label: language === 'no' ? 'Sør-Amerika' : 'South America' },
    { id: 'africa', label: language === 'no' ? 'Afrika' : 'Africa' },
    { id: 'north-america', label: language === 'no' ? 'Nord-Amerika' : 'North America' },
    { id: 'asia', label: language === 'no' ? 'Asia' : 'Asia' }
  ];

  const leagues = [
    { id: 'premier-league', label: 'Premier League' },
    { id: 'la-liga', label: 'La Liga' },
    { id: 'serie-a', label: 'Serie A' },
    { id: 'bundesliga', label: 'Bundesliga' },
    { id: 'ligue-1', label: 'Ligue 1' }
  ];

  const playerDatabase = {
    europe: {
      '1980-1990': [
        { name: 'Diego Maradona', country: 'Argentina', position: 'Forward', clubs: ['Barcelona', 'Napoli'], worldCup: true, ballon: true, premierLeague: false, leagues: ['La Liga', 'Serie A'], height: 165, hair: 'dark', beard: false },
        { name: 'Marco van Basten', country: 'Netherlands', position: 'Forward', clubs: ['Ajax', 'AC Milan'], worldCup: false, ballon: true, premierLeague: false, leagues: ['Serie A'], height: 188, hair: 'blonde', beard: false },
        { name: 'Michel Platini', country: 'France', position: 'Midfielder', clubs: ['Juventus'], worldCup: false, ballon: true, premierLeague: false, leagues: ['Serie A'], height: 178, hair: 'dark', beard: false }
      ],
      '1990-2000': [
        { name: 'Zinedine Zidane', country: 'France', position: 'Midfielder', clubs: ['Juventus', 'Real Madrid'], worldCup: true, ballon: true, premierLeague: false, leagues: ['Serie A', 'La Liga'], height: 185, hair: 'bald', beard: false },
        { name: 'Ronaldo Nazário', country: 'Brazil', position: 'Forward', clubs: ['Barcelona', 'Inter Milan', 'Real Madrid'], worldCup: true, ballon: true, premierLeague: false, leagues: ['La Liga', 'Serie A'], height: 183, hair: 'dark', beard: false },
        { name: 'Alan Shearer', country: 'England', position: 'Forward', clubs: ['Newcastle United', 'Blackburn Rovers'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League'], height: 180, hair: 'dark', beard: false }
      ],
      '2000-2010': [
        { name: 'Cristiano Ronaldo', country: 'Portugal', position: 'Forward', clubs: ['Manchester United', 'Real Madrid'], worldCup: false, ballon: true, premierLeague: true, leagues: ['Premier League', 'La Liga'], height: 187, hair: 'dark', beard: false },
        { name: 'Lionel Messi', country: 'Argentina', position: 'Forward', clubs: ['Barcelona'], worldCup: false, ballon: true, premierLeague: false, leagues: ['La Liga'], height: 170, hair: 'dark', beard: true },
        { name: 'Thierry Henry', country: 'France', position: 'Forward', clubs: ['Arsenal', 'Barcelona'], worldCup: true, ballon: false, premierLeague: true, leagues: ['Premier League', 'La Liga'], height: 188, hair: 'dark', beard: false },
        { name: 'Kaká', country: 'Brazil', position: 'Midfielder', clubs: ['AC Milan', 'Real Madrid'], worldCup: true, ballon: true, premierLeague: false, leagues: ['Serie A', 'La Liga'], height: 186, hair: 'dark', beard: false }
      ],
      '2010-2020': [
        { name: 'Luka Modrić', country: 'Croatia', position: 'Midfielder', clubs: ['Tottenham', 'Real Madrid'], worldCup: false, ballon: true, premierLeague: true, leagues: ['Premier League', 'La Liga'], height: 172, hair: 'light', beard: false },
        { name: 'Andrés Iniesta', country: 'Spain', position: 'Midfielder', clubs: ['Barcelona'], worldCup: true, ballon: false, premierLeague: false, leagues: ['La Liga'], height: 171, hair: 'dark', beard: false },
        { name: 'Sergio Ramos', country: 'Spain', position: 'Defender', clubs: ['Real Madrid', 'PSG'], worldCup: true, ballon: false, premierLeague: false, leagues: ['La Liga', 'Ligue 1'], height: 184, hair: 'dark', beard: true }
      ],
      '2020-2025': [
        { name: 'Erling Haaland', country: 'Norway', position: 'Forward', clubs: ['Borussia Dortmund', 'Manchester City'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Bundesliga', 'Premier League'], height: 194, hair: 'blonde', beard: false },
        { name: 'Kylian Mbappé', country: 'France', position: 'Forward', clubs: ['PSG', 'Real Madrid'], worldCup: true, ballon: false, premierLeague: false, leagues: ['Ligue 1', 'La Liga'], height: 178, hair: 'dark', beard: false },
        { name: 'Kevin De Bruyne', country: 'Belgium', position: 'Midfielder', clubs: ['Manchester City'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League'], height: 181, hair: 'ginger', beard: false }
      ]
    },
    'south-america': {
      '1990-2000': [
        { name: 'Romário', country: 'Brazil', position: 'Forward', clubs: ['PSV', 'Barcelona'], worldCup: true, ballon: true, premierLeague: false, leagues: ['La Liga'], height: 167, hair: 'dark', beard: false },
        { name: 'Rivaldo', country: 'Brazil', position: 'Forward', clubs: ['Barcelona'], worldCup: true, ballon: true, premierLeague: false, leagues: ['La Liga'], height: 186, hair: 'dark', beard: false }
      ],
      '2000-2010': [
        { name: 'Ronaldinho', country: 'Brazil', position: 'Forward', clubs: ['Barcelona', 'AC Milan'], worldCup: true, ballon: true, premierLeague: false, leagues: ['La Liga', 'Serie A'], height: 181, hair: 'dark', beard: false }
      ],
      '2010-2020': [
        { name: 'Neymar', country: 'Brazil', position: 'Forward', clubs: ['Barcelona', 'PSG'], worldCup: false, ballon: false, premierLeague: false, leagues: ['La Liga', 'Ligue 1'], height: 175, hair: 'dark', beard: false },
        { name: 'Luis Suárez', country: 'Uruguay', position: 'Forward', clubs: ['Liverpool', 'Barcelona'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League', 'La Liga'], height: 182, hair: 'dark', beard: true }
      ],
      '2020-2025': [
        { name: 'Vinícius Júnior', country: 'Brazil', position: 'Forward', clubs: ['Real Madrid'], worldCup: false, ballon: false, premierLeague: false, leagues: ['La Liga'], height: 176, hair: 'dark', beard: false }
      ]
    },
    africa: {
      '1990-2000': [
        { name: 'George Weah', country: 'Liberia', position: 'Forward', clubs: ['AC Milan', 'PSG', 'Chelsea'], worldCup: false, ballon: true, premierLeague: true, leagues: ['Serie A', 'Ligue 1', 'Premier League'], height: 185, hair: 'dark', beard: false }
      ],
      '2000-2010': [
        { name: 'Samuel Eto\'o', country: 'Cameroon', position: 'Forward', clubs: ['Barcelona', 'Inter Milan'], worldCup: false, ballon: false, premierLeague: false, leagues: ['La Liga', 'Serie A'], height: 180, hair: 'dark', beard: false },
        { name: 'Didier Drogba', country: 'Ivory Coast', position: 'Forward', clubs: ['Chelsea'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League'], height: 188, hair: 'bald', beard: false }
      ],
      '2010-2020': [
        { name: 'Mohamed Salah', country: 'Egypt', position: 'Forward', clubs: ['Liverpool', 'Chelsea'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League'], height: 175, hair: 'dark', beard: true },
        { name: 'Yaya Touré', country: 'Ivory Coast', position: 'Midfielder', clubs: ['Barcelona', 'Manchester City'], worldCup: false, ballon: false, premierLeague: true, leagues: ['La Liga', 'Premier League'], height: 188, hair: 'bald', beard: false }
      ],
      '2020-2025': [
        { name: 'Sadio Mané', country: 'Senegal', position: 'Forward', clubs: ['Liverpool', 'Bayern Munich'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League', 'Bundesliga'], height: 175, hair: 'dark', beard: false }
      ]
    },
    'north-america': {
      '2000-2010': [
        { name: 'Carlos Vela', country: 'Mexico', position: 'Forward', clubs: ['Arsenal', 'Real Sociedad'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League', 'La Liga'], height: 177, hair: 'dark', beard: true }
      ],
      '2010-2020': [
        { name: 'Javier Hernández', country: 'Mexico', position: 'Forward', clubs: ['Manchester United', 'Real Madrid'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League', 'La Liga'], height: 175, hair: 'dark', beard: false }
      ]
    },
    asia: {
      '2000-2010': [
        { name: 'Park Ji-sung', country: 'South Korea', position: 'Midfielder', clubs: ['Manchester United', 'PSV'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League'], height: 175, hair: 'dark', beard: false }
      ],
      '2010-2020': [
        { name: 'Son Heung-min', country: 'South Korea', position: 'Forward', clubs: ['Tottenham', 'Bayer Leverkusen'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League', 'Bundesliga'], height: 183, hair: 'dark', beard: false }
      ],
      '2020-2025': [
        { name: 'Son Heung-min', country: 'South Korea', position: 'Forward', clubs: ['Tottenham'], worldCup: false, ballon: false, premierLeague: true, leagues: ['Premier League'], height: 183, hair: 'dark', beard: false }
      ]
    }
  };

  const calculateScore = (questionsAsked, filtersUsed) => {
    const baseScore = 1000;
    const questionPenalty = questionsAsked * 30;
    const filterPenalty = filtersUsed * 100;
    const earlyBonus = Math.max(0, (20 - questionsAsked) * 20);
    
    return Math.max(0, baseScore - questionPenalty - filterPenalty + earlyBonus);
  };

  const startGame = () => {
    const activeFilters = Object.values(useFilters).filter(f => f).length;
    
    let allPlayers = [];
    
    Object.keys(playerDatabase).forEach(continent => {
      Object.keys(playerDatabase[continent]).forEach(period => {
        playerDatabase[continent][period].forEach(player => {
          allPlayers.push({ ...player, continent, period });
        });
      });
    });

    if (useFilters.continent && selectedContinent) {
      allPlayers = allPlayers.filter(p => p.continent === selectedContinent);
    }
    
    if (useFilters.period && selectedPeriod) {
      allPlayers = allPlayers.filter(p => p.period === selectedPeriod);
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

    if (q.includes('forward') || q.includes('striker') || q.includes('attacker') || q.includes('spiss')) {
      answer = currentPlayer.position === 'Forward' ? t.yes : t.no;
      explanation = `${t.position} ${currentPlayer.position}`;
    } else if (q.includes('midfielder') || q.includes('midfield') || q.includes('midtbane')) {
      answer = currentPlayer.position === 'Midfielder' ? t.yes : t.no;
      explanation = `${t.position} ${currentPlayer.position}`;
    } else if (q.includes('defender') || q.includes('defence') || q.includes('defense') || q.includes('forsvar')) {
      answer = currentPlayer.position === 'Defender' ? t.yes : t.no;
      explanation = `${t.position} ${currentPlayer.position}`;
    } else if (q.includes('world cup') || q.includes('vm')) {
      answer = currentPlayer.worldCup ? t.yes : t.no;
      explanation = currentPlayer.worldCup ? (language === 'no' ? 'Vant VM' : 'Won World Cup') : (language === 'no' ? 'Vant ikke VM' : 'Did not win World Cup');
    } else if (q.includes('ballon')) {
      answer = currentPlayer.ballon ? t.yes : t.no;
      explanation = currentPlayer.ballon ? (language === 'no' ? 'Vant Ballon d\'Or' : 'Won Ballon d\'Or') : (language === 'no' ? 'Vant ikke Ballon d\'Or' : 'Did not win Ballon d\'Or');
    } else if (q.includes('premier league')) {
      answer = currentPlayer.premierLeague ? t.yes : t.no;
      explanation = currentPlayer.premierLeague ? (language === 'no' ? 'Spilte i Premier League' : 'Played in Premier League') : (language === 'no' ? 'Spilte ikke i Premier League' : 'Did not play in Premier League');
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
    } else if (q.includes('dark hair') || q.includes('mørkt hår')) {
      answer = currentPlayer.hair === 'dark' ? t.yes : t.no;
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
    } else {
      answer = language === 'no' ? 'Kan ikke bekrefte' : 'Unable to verify';
      explanation = language === 'no' ? 
        'Prøv å spørre om: posisjon, klubber, VM, Ballon d\'Or, høyde, eller utseende' :
        'Try asking about: position, clubs, World Cup, Ballon d\'Or, height, or appearance';
    }

    setIsVerifying(false);
    return { answer, explanation };
  };

  const handleQuestionSubmit = async () => {
    if (!currentQuestion.trim() || remainingQuestions === 0 || isVerifying) return;

    const result = await verifyAnswer(currentQuestion);
    
    setQuestions([...questions, {
      question: currentQuestion,
      answer: result.answer,
      explanation: result.explanation
    }]);
    
    setCurrentQuestion('');
    setRemainingQuestions(remainingQuestions - 1);
    
    if (remainingQuestions - 1 === 5 && !showHint) {
      setShowHint(true);
    }
  };

  const handleFinalGuess = () => {
    if (!finalGuess.trim()) return;
    
    const isCorrect = finalGuess.toLowerCase().includes(currentPlayer.name.toLowerCase()) ||
                      currentPlayer.name.toLowerCase().includes(finalGuess.toLowerCase());
    
    const filtersUsed = Object.values(useFilters).filter(f => f).length;
    const finalScore = calculateScore(questions.length, filtersUsed);
    setScore(finalScore);
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
              onClick={() => { setLanguage('en'); setGameState('setup'); }}
              className="w-full py-4 bg-blue-500 text-white font-bold text-lg rounded-xl hover:bg-blue-600 transition-all"
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => { setLanguage('no'); setGameState('setup'); }}
              className="w-full py-4 bg-red-500 text-white font-bold text-lg rounded-xl hover:bg-red-600 transition-all"
            >
              🇳🇴 Norsk
            </button>
          </div>
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
              <p className="text-gray-600">{t.subtitle}</p>
              <button
                onClick={() => setGameState('language')}
                className="mt-4 text-sm text-blue-500 hover:text-blue-700"
              >
                {t.selectLanguage}
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'won' || gameState === 'lost') {
    const filtersUsed = Object.values(useFilters).filter(f => f).length;
    const scoreDetails = {
      base: 1000,
      questionPenalty: questions.length * 30,
      filterPenalty: filtersUsed * 100,
      bonus: Math.max(0, (20 - questions.length) * 20)
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
                <p>{t.questionPenalty} -{scoreDetails.questionPenalty} ({questions.length} × 30)</p>
                <p>{t.filterPenalty} -{scoreDetails.filterPenalty} ({filtersUsed} × 100)</p>
                <p>{t.bonusPoints} +{scoreDetails.bonus}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg mb-3">{t.playerDetails}</h3>
              <div className="text-left space-y-2">
                <p><strong>{t.country}</strong> {currentPlayer.country}</p>
                <p><strong>{t.position}</strong> {currentPlayer.position}</p>
                <p><strong>{t.clubs}</strong> {currentPlayer.clubs.join(', ')}</p>
                <p><strong>{t.leagues}</strong> {currentPlayer.leagues.join(', ')}</p>
                <p><strong>{t.height}</strong> {currentPlayer.height} {t.cm}</p>
                <p><strong>{t.appearance}</strong> {currentPlayer.hair} hair, {currentPlayer.beard ? 'beard' : 'no beard'}</p>
                <p><strong>{t.worldCup}</strong> {currentPlayer.worldCup ? t.yes : t.no}</p>
                <p><strong>{t.ballonDor}</strong> {currentPlayer.ballon ? t.yes : t.no}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">{t.questionsUsed} {questions.length} / 20</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
            <div className="flex gap-4">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-blue-600">{remainingQuestions}</span>
                <span className="text-gray-600 ml-1 text-sm">{t.questionsLeft}</span>
              </div>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                {t.restart}
              </button>
            </div>
          </div>

          {showHint && remainingQuestions <= 5 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  <strong>{t.hint}</strong> {t.playerFrom} {currentPlayer.country} {t.playedAs} {currentPlayer.position}
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
                disabled={isVerifying || remainingQuestions === 0}
              />
              <button
                onClick={handleQuestionSubmit}
                disabled={isVerifying || !currentQuestion.trim() || remainingQuestions === 0}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                {isVerifying ? t.checking : t.asking}
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
            {questions.map((q, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-800 flex-1 mr-2">Q{index + 1}: {q.question}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                    q.answer === t.yes || q.answer === 'Yes' ? 'bg-green-100 text-green-700' :
                    q.answer === t.no || q.answer === 'No' ? 'bg-red-100 text-red-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {q.answer}
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
