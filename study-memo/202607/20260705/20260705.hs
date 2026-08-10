maximum' :: (Ord a) => [a] -> a
maximum' = foldl1 max

reverse' :: [a] -> [a]
-- reverse' = foldl (\acc x -> x : acc) []
reverse' = foldl (flip (:)) []

product' :: (Num a) => [a] -> a
product' = foldl (*) 1

filter' :: (a -> Bool) -> [a] -> [a]
-- 述語pがtrueなら先頭にくっつける。それ以外はアキュムレータを変更せず返す
filter' p = foldr (\x acc -> if p x then x : acc else acc) []

last' :: [a] -> a
-- 常に新しい要素を返して最後まで到達したらアキュムレータを返す
last' = foldl1 (\_ x -> x)

and' :: [Bool] -> Bool
and' xs = foldr (&&) True xs
