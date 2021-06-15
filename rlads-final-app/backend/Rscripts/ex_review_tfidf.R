library(tidytext)
library(tidyverse)

library(tidyr)
library(dplyr)
library(ggplot2)

library(jsonlite)

args <- commandArgs(trailingOnly = TRUE)
name <- args[1]

review_tfidf <- readRDS("Rdata/reviews_tfidf.rds")

tfidf_filter <- function (place, ratings) {
  filtered <- review_tfidf %>%
    filter(place == !!place, rating %in% !!ratings) %>%
    group_by(word) %>%
    select(word, tf_idf) %>%
    summarize(tf_idf = sum(tf_idf)) %>%
    arrange(desc(tf_idf)) %>%
    ungroup() %>%
    slice_max(tf_idf, n = 15) %>%
    mutate(y = fct_reorder(word, tf_idf))
  return(filtered)
}

res <- tfidf_filter(name, c(4, 5))
resJSON <- jsonlite::toJSON(res)
print(resJSON)

# res_plot <- res %>%
#   ggplot(aes(x = tf_idf, y = fct_reorder(word, tf_idf))) +
#   geom_col()
# print(res_plot)

