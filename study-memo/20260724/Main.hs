import qualified Geometry.Sphere as Sphere
import qualified Geometry.Cuboid as Cuboid
import qualified Geometry.Cube as Cube

main :: IO ()
main = do
    -- 同じ名前(volume, area)の関数を複数モジュールから使うので修飾付きインポートが必須
    putStrLn $ "球(半径3)の体積: " ++ show (Sphere.volume 3)
    putStrLn $ "球(半径3)の表面積: " ++ show (Sphere.area 3)

    putStrLn $ "直方体(3x4x5)の体積: " ++ show (Cuboid.volume 3 4 5)
    putStrLn $ "直方体(3x4x5)の表面積: " ++ show (Cuboid.area 3 4 5)

    putStrLn $ "立方体(1辺2)の体積: " ++ show (Cube.volume 2)
    putStrLn $ "立方体(1辺2)の表面積: " ++ show (Cube.area 2)
