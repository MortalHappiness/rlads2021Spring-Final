load("Rdata/reviews_tfidf.Rda")
suppressPackageStartupMessages({
  library(tidyverse)
  library(ggplot2)
  library(showtext)
})
showtext_auto()

tfidf_filter <- function (place, ratings) {
  filtered <- review_tfidf %>%
    filter(place == !!place, rating %in% !!ratings) %>%
    group_by(word) %>%
    select(word, tf_idf) %>%
    summarize(tf_idf = sum(tf_idf)) %>%
    arrange(desc(tf_idf)) %>%
    ungroup() %>%
    slice_max(tf_idf, n = 15)
  return(filtered)
}


args = commandArgs(trailingOnly=TRUE)

res <- tfidf_filter(args[1], args[-1])
x11()
res %>%
  ggplot(aes(x=tf_idf,y = fct_reorder(word, tf_idf))) +
  geom_col()

invisible(readLines("stdin", n=1))
