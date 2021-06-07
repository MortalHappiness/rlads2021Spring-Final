library("rjson")

place_path <- "data/places.json"
place_list <- fromJSON(file = place_path)

place_list 
rows <- length(place_list)
place_df <- data.frame(
  id = character(rows)
)

for (x in seq_along(place_list)) {
  place_df$id[x] = names(place_list)[x]
  place_df$name[x] = place_list[[x]]$name
  place_df$first_type[x] = place_list[[x]]$types[1]
  place_df$second_type[x] = place_list[[x]]$types[2]
  place_df$third_type[x] = place_list[[x]]$types[3]
  place_df$user_rating_total[x] = place_list[[x]]$user_rating_total
  
  rating <- place_list[[x]]$rating
  place_df$rating[x] = ifelse(is.null(rating), NA, rating)
}

save(place_df, file = "Rdata/place.Rda")