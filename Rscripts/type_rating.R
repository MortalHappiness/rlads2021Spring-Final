load("./Rdata/place.Rda") # place_df

#  library(showtext)
#  showtext_auto()

library(tidyverse)
library(ggplot2)

place_df_without_na <- place_df %>%
  filter(!is.na(rating))

first_type_rating <- place_df_without_na %>%
  group_by(first_type) %>%
  summarize(n = n(),
            avg = mean(rating),
            std = sd(rating)) %>%
  arrange(desc(n))


#  x11()
place_df_without_na %>%
  #  filter(first_type %in% c('restaurant', 'cafe', 'bakery', 'health')) %>%
  ggplot(aes(x = as.factor(first_type), y = rating)) +
  geom_boxplot()
