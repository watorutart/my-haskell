module Memo20260625 where

applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)
