load("Rdata/reviews.Rda")

library(tidytext)

review_tidy <- review_jeibaR %>%
  unnest_tokens(output="word", input="text", token="regex", pattern = "\u3000")

review_word_count <- review_tidy %>%
  count(place, rating, word) %>%
  unite("place_rating", place, rating, remove = F)

review_tfidf <- review_word_count <- review_word_count %>%
  bind_tf_idf(word, place_rating, n)%>%
  arrange(desc(tf_idf))

save(review_tfidf, file="Rdata/reviews_tfidf.Rda")
