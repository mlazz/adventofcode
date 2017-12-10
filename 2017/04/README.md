# --- Day 4: High-Entropy Passphrases ---

A new system policy has been put in place that requires all accounts to use a **passphrase** instead of simply a pass**word**. A passphrase consists of a series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:
- _aa bb cc dd ee_ is valid.
- _aa bb cc dd aa_ is not valid - the word _aa_ appears more than once.
- _aa bb cc dd aaa_ is valid - _aa_ and _aaa_ count as different words.

The system's full passphrase list is available as your puzzle input. **How many passphrases are valid?**

Your puzzle answer was _455_.

# --- Part Two ---

For added security, yet another system policy has been put in place. Now, a valid passphrase must contain no two words that are anagrams of each other - that is, a passphrase is invalid if any word's letters can be rearranged to form any other word in the passphrase.

For example:
- _abcde fghij_ is a valid passphrase.
- _abcde xyz ecdab_ is not valid - the letters from the third word can be rearranged to form the first word.
- _a ab abc abd abf abj_ is a valid passphrase, because **all** letters need to be used when forming another word.
- _iiii oiii ooii oooi oooo_ is valid.
- _oiii ioii iioi iiio_ is not valid - any of these words can be rearranged to form any other word.

Under this new system policy, **how many passphrases are valid?**

Your puzzle answer was _186_.

***Both parts of this puzzle are complete! They provide two gold stars: ** ***
