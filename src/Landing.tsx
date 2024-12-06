import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// Definición de tipo más específica
type Letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

type Word = { 
  word: string; 
  translation: string 
};

type Category = "color" | "animal" | "object" | "fruit" | "verb" | "place" | "profession";

// Modify the type to use an index signature
type WordDatabase = {
  [key: string]: {
    color: Word[];
    animal: Word[];
    object: Word[];
    fruit: Word[];
    verb: Word[];
    place: Word[];
    profession: Word[];
  }
};

// Importación con aserción de tipo más flexible
import wordDataBase from './word_database.json';

const categories: Category[] = ['color', 'animal', 'object', 'fruit', 'verb', 'place', 'profession'];

export default function VocabularyGenerator() {
  const [selectedLetter, setSelectedLetter] = useState<Letter>('a');
  const [generatedWords, setGeneratedWords] = useState<Record<string, Word>>({});

  useEffect(() => {
    generateWords(selectedLetter);
  }, [selectedLetter]);

  const generateWords = (letter: Letter) => {
    const words: Record<string, Word> = {};

    categories.forEach((category) => {
      // Type assertion to handle potential undefined
      const letterData = (wordDataBase as WordDatabase)[letter];
      if (letterData) {
        const options = letterData[category];
        if (options && options.length > 0) {
          const randomIndex = Math.floor(Math.random() * options.length);
          words[category] = options[randomIndex];
        }
      }
    });

    setGeneratedWords(words);
  };

  const alphabet: Letter[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  return (
    <Card sx={{ width: '100%', maxWidth: 1200, margin: 'auto' }}>
      <CardHeader>
        <Typography variant="h5" align="center" fontWeight="bold">
          Vocabulary Generator by Initial Letter
        </Typography>
      </CardHeader>
      <CardContent>
        <div style={{ marginBottom: '16px' }}>
          <FormControl fullWidth>
            <InputLabel>Select a letter</InputLabel>
            <Select
              value={selectedLetter}
              onChange={(e) => {
                const letter = e.target.value as Letter;
                setSelectedLetter(letter);
                generateWords(letter);
              }}
              label="Select a letter"
            >
              {alphabet.map((letter) => (
                <MenuItem key={letter} value={letter}>
                  {letter.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {categories.map((category) => (
           
            <Card key={category}>
              <CardContent>
              <Typography variant="h6" style={{ textTransform: 'capitalize' }}>
                  <strong>{category}</strong>
                </Typography>
                <Typography variant="body1">
                  {generatedWords[category] ? (
                    <>
                      <strong>{generatedWords[category].word}</strong> - {generatedWords[category].translation}

                    </>
                  ) : (
                    'No word available'
                  )}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button variant="contained" onClick={() => generateWords(selectedLetter)}>
            Generate New Words
          </Button>
        </div>
      </CardContent>
    </Card>
    
  );
}