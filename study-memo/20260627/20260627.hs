flip' :: (a -> b -> c) -> (b -> a -> c)
flip' f = g
    where f x y = f y x
