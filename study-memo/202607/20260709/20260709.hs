-- sum' :: (Num a) => [a] -> a
-- sum' xs = foldl (+) 0 xs
sum' :: (Num a) => [a] -> a
sum' = foldl (+) 0

-- fn x = ceiling (negate (tan (cos (max 50 x))))
-- NG例 cos (max 50)は関数のcosを取ってしまう： fn = ceiling (negate (tan (cos (max 50))))
-- → 代わりに関数合成をやる
fn = ceiling . negate . tan . cos . max 50

-- oddSquareSum :: Integer
-- oddSquareSum = sum (takeWhile (<10000) (filter odd (map (^2) [1..])))
-- 書き換え
oddSquareSum :: Integer
oddSquareSum = sum . takeWhile (<10000) . filter odd $ map (^2) [1..]
