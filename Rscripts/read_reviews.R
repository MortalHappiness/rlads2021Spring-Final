library(tidyverse)

review_dir <- "data/reviews"
review_paths <- dir(review_dir, full.names = T)

review_db <- data.frame(place=character(),
                 rating=double(),
                 text=character())
for (path in review_paths) {
  id = tools::file_path_sans_ext(basename(path))
  reviews <- read_csv(path)
  anonymous <- reviews %>%
    select(c("rating", "text")) %>%
    drop_na() %>%
    add_column(place=id, .before="rating") %>%
    
  if (nrow(anonymous) > 0) {
    review_db <- bind_rows(review_db, anonymous)
  }
}

save(review_db, file="Rdata/reviews.Rda")
