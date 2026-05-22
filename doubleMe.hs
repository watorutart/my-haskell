doubleMe :: Int -> Int
doubleMe x = x * 2

main :: IO ()
main = print( doubleMe (doubleMe (doubleMe 1)) )
