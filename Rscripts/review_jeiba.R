library(jiebaR)
library(tidyverse)

reviews_df <- readRDS("../Rdata/reviews.rds")

seg <- worker()

split_word <- function (content) {
  if (is.na(content)) return(NA)
  res <- segment(content, seg)
  return(paste0(res, collapse = "\u3000"))
}

reviews_df <- reviews_df %>%
  mutate(text = sapply(text, split_word))

saveRDS(reviews_df, file = "../Rdata/reviews_jeiba.rds")