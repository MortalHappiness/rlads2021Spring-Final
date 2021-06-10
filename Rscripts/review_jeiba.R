load("Rdata/reviews.Rda")

library(jiebaR)
library(tidyverse)

seg <- worker()

split_word <- function (content) {
  res <- segment(content, seg)
  return(paste0(res, collapse = "\u3000"))
}


review_jeibaR <- review_db %>%
  mutate(text = sapply(text, split_word))

save(review_db, file="Rdata/reviews_jeiba.Rda")
