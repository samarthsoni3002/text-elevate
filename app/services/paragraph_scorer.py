import language_tool_python
import textstat
from spellchecker import SpellChecker
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
import logging

# Download NLTK data once
nltk.download("punkt", quiet=True)

# Initialize heavy objects globally (reused across requests)
tool = language_tool_python.LanguageTool('en-US')
spell = SpellChecker()

# Set up logger
logger = logging.getLogger(__name__)

def compute_grammar_score(text):
    matches = tool.check(text)
    num_errors = len(matches)
    words = word_tokenize(text)
    num_words = len(words)

    error_rate = num_errors / num_words if num_words > 0 else 1
    score = max(0, 100 - error_rate * 100)

    return round(score, 2)

def compute_spelling_score(text):
    words = word_tokenize(text)
    total_words = len(words)
    misspelled = spell.unknown(words)

    if total_words == 0:
        return 100.0

    correct = total_words - len(misspelled)
    score = (correct / total_words) * 100

    return round(score, 2)

def compute_readability_score(text):
    flesch = textstat.flesch_reading_ease(text)
    flesch = min(max(flesch, 0), 100)
    return round(flesch, 2)

def compute_vocab_score(text):
    words = word_tokenize(text)
    total_words = len(words)
    unique_words = len(set(words))

    if total_words == 0:
        return 100.0

    richness = (unique_words / total_words) * 100
    return round(richness, 2)

def compute_conciseness_score(text):
    sentences = sent_tokenize(text)
    if not sentences:
        return 100.0

    long_sentences = [s for s in sentences if len(word_tokenize(s)) > 20]
    ratio = len(long_sentences) / len(sentences)
    score = max(0, 100 - (ratio * 100))
    return round(score, 2)

def paragraph_final_score(text):
    text = text.strip()
    if not text:
        logger.warning("Empty text received for scoring.")
        return {
            "final_score": 0.0,
            "grammar": 0.0,
            "spelling": 0.0,
            "readability": 0.0,
            "vocabulary": 0.0,
            "conciseness": 0.0
        }

    logger.info(f"Scoring paragraph of length {len(text)} characters.")

    grammar = compute_grammar_score(text)
    spelling = compute_spelling_score(text)
    readability = compute_readability_score(text)
    vocab = compute_vocab_score(text)
    conciseness = compute_conciseness_score(text)

    final = (
        0.3 * grammar +
        0.2 * spelling +
        0.2 * readability +
        0.2 * vocab +
        0.1 * conciseness
    )

    return {
        "final_score": round(final, 2),
        "grammar": grammar,
        "spelling": spelling,
        "readability": readability,
        "vocabulary": vocab,
        "conciseness": conciseness
    }
