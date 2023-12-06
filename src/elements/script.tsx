import { MdLocalFireDepartment, MdWaterDrop } from "react-icons/md";
import { SiGhostery, SiGoogleearth } from "react-icons/si";
import { FiWind } from "react-icons/fi";

export interface ElementProps {
  name: string;
  icon: JSX.Element;
  values: number[];
}

export class NameElementCalculator {
  elements: ElementProps[] = [
    {
      name: "Spirit",
      icon: <SiGhostery className='icon'/>,
      values: [0, 9],
    },
    {
      name: "Fire",
      icon: <MdLocalFireDepartment className='icon'/>,
      values: [1, 5],
    },
    {
      name: "Water",
      icon: <MdWaterDrop className='icon'/>,
      values: [2, 6],
    },
    {
      name: "Air",
      icon: <FiWind className='icon'/>,
      values: [3, 7],
    },
    {
      name: "Earth",
      icon: <SiGoogleearth className='icon'/>,
      values: [4, 8],
    },
  ];

  private lettersGroup = [
    "AJS",
    "BKT",
    "CLU",
    "DMV",
    "ENW",
    "FOX",
    "GPY",
    "HQZ",
    "IR",
  ];

  // * METHODS
  getElementFromCompleteName(completeName: string) {
    const calculatedNameResult =
      this.calculateValueFromCompleteName(completeName);

    const element = this.elements.filter((element) =>
      element.values.includes(calculatedNameResult)
    )[0];
    console.log(element.name)
    return element;
  }

  calculateValueFromCompleteName(completeName: string) {
    const nameByWord = completeName.split(" ");
    const wordsValues: number[] = nameByWord.map((name) =>
      this.getWordValue(name)
    );
    console.debug('calculateValueFromCompleteName');
    console.table([wordsValues, nameByWord]);
    
    // VERIFY EACH WORD VALUE, CASE DOUBLE DIGITS VALUE, SUM DIGITS
    // SUM WORDS' VALUES, CASE DOUBLE DIGITS VALUE, SUM DIGITS
    const result = wordsValues.reduce(
      (accumulator, value) => accumulator + value
    );

    console.log(this.formatDoubleDigitNumbe(result));


    return this.formatDoubleDigitNumbe(result);
  }

  private getWordValue(word: string) {
    let value = word
      .split("") // BY LETTER
      .reduce((accumulator, letter) => accumulator + this.getLetterValue(letter), 0 );

    if (value >= 10) { //FIX DOUBLE DIGITS WORD VALUE
      const formattedValue = this.formatDoubleDigitNumbe(value);
      value = formattedValue;
    }

    console.debug('getWordValue');
    console.log(value, word);

    return value;
  }

  private getLetterValue = (letter: string) => {
    let value: number = 0;

    this.lettersGroup
      .forEach((group, index) => {
        if (group.includes(letter.toUpperCase())) value = index + 1;
      });

    return value;
  };

  private formatDoubleDigitNumbe(value: number) {
    return String(value)
        .split("")
        .reduce((accumulator, value) => accumulator + +value, 0);
  }
}
