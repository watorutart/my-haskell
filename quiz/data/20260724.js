window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260724"] = {
  date: "20260724",
  title: "モジュールの階層構造とqualified importによる名前衝突の回避",
  questions: [
    {
      id: "20260724-q1",
      question: "Haskellでモジュールを定義するとき、モジュール名とファイル名にはどのような関係が求められるか?",
      code: `<span class="keyword">module</span> Geometry
( sphereVolume
, sphereArea
) <span class="keyword">where</span>`,
      choices: [
        { text: "モジュール名とファイル名は無関係で自由に決められる", isCorrect: false },
        { text: "モジュール名とファイル名を一致させる必要がある(例: module Geometryを定義するファイルはGeometry.hsという名前にする)", isCorrect: true },
        { text: "ファイル名は拡張子を除いてすべて小文字にしなければならない", isCorrect: false },
        { text: "モジュール名はexport listの最初の関数名と同じにする", isCorrect: false }
      ],
      explanation: "Haskellではモジュール名とそれを定義するファイル名を一致させる必要がある。module Geometryならファイルは Geometry.hs でなければならない。"
    },
    {
      id: "20260724-q2",
      question: "<code>import qualified Geometry.Sphere as Sphere</code> のように階層構造を持つモジュールをimportする場合、Sphere.hsはどこに配置する必要があるか?",
      code: `<span class="keyword">import qualified</span> Geometry.Sphere <span class="keyword">as</span> Sphere`,
      choices: [
        { text: "プロジェクトの一番外側のルートディレクトリ直下", isCorrect: false },
        { text: "importする側のファイルと全く同じディレクトリ", isCorrect: false },
        { text: "モジュール名のドットをディレクトリ区切りに変換したパス(Geometry/Sphere.hs)が、GHC/GHCiの検索パス(既定では起動時のカレントディレクトリ)の直下に存在していればよい", isCorrect: true },
        { text: "どこに置いてもコンパイラが自動探索するので配置は関係ない", isCorrect: false }
      ],
      explanation: "モジュール名のドットはディレクトリ区切りに機械的に変換され、GHC/GHCiの検索パス(既定はカレントディレクトリ、-iで追加可能)の直下から探される。importする側のファイル自身の場所は考慮されない。"
    },
    {
      id: "20260724-q3",
      question: "Main.hsでは Sphere, Cuboid, Cube の3モジュールをすべて qualified importで読み込んでいる。qualifiedを使わなかった場合に起きる問題として正しいものは?",
      code: `<span class="keyword">import qualified</span> Geometry.Sphere <span class="keyword">as</span> Sphere
<span class="keyword">import qualified</span> Geometry.Cuboid <span class="keyword">as</span> Cuboid
<span class="keyword">import qualified</span> Geometry.Cube <span class="keyword">as</span> Cube

main = putStrLn $ show (Sphere.volume 3)`,
      choices: [
        { text: "Sphere, Cuboid, Cubeの各モジュールが同じ名前(volume, area)の関数をエクスポートしているため、名前が衝突してコンパイルエラーになる", isCorrect: true },
        { text: "qualifiedを付けないとGHCが型推論できずコンパイルエラーになる", isCorrect: false },
        { text: "qualifiedはIOアクションを含むモジュールにのみ必須な機能である", isCorrect: false },
        { text: "qualifiedを外すとputStrLnが使えなくなる", isCorrect: false }
      ],
      explanation: "Sphere・Cuboid・Cubeはいずれもvolumeとareaという同名の関数をエクスポートしている。qualifiedを付けずにimportすると、どのモジュールのvolume/areaか特定できず名前が衝突する。"
    },
    {
      id: "20260724-q4",
      question: "同じ学習メモに登場するGeometry.hs(フラット版)では、sphereVolumeやcubeVolumeのように関数名に型名の接頭辞を付けている。これはなぜか?",
      code: `<span class="keyword">module</span> Geometry
( sphereVolume
, sphereArea
, cubeVolume
, cubeArea
, cuboidArea
, cuboidVolume
) <span class="keyword">where</span>`,
      choices: [
        { text: "Haskellの文法上、モジュール内の関数名には必ず接頭辞を付けなければならないから", isCorrect: false },
        { text: "型推論のヒントとしてコンパイラに接頭辞を伝える必要があるから", isCorrect: false },
        { text: "exportする関数の数を制限するため", isCorrect: false },
        { text: "1つのモジュール内でvolume/areaのような名前が球・立方体・直方体で重複するのを、階層モジュール分割とqualified importではなく命名規則で回避するため", isCorrect: true }
      ],
      explanation: "階層モジュール+qualified importで名前衝突を回避する代わりに、1つのモジュール内で命名規則(型名を接頭辞に付ける)によって同じ問題を解決している。"
    },
    {
      id: "20260724-q5",
      question: "学習メモには当初「インポートするモジュールと同じフォルダになきゃダメ」とあったが、実際にGHC/GHCiがモジュールを解決する仕組みとして正しいものはどれか?",
      choices: [
        { text: "importする側のファイルの場所を基準に、そこからの相対パスでモジュールファイルを探す(JS/Pythonの相対importと同じ仕組み)", isCorrect: false },
        { text: "importしている側のファイル自身の場所は一切考慮されず、モジュール名をパスに変換したもの(例: Geometry/Sphere.hs)がモジュール検索パス(既定はカレントディレクトリ)の直下にあるかどうかで決まる", isCorrect: true },
        { text: "同じフォルダに置かなければGHCiは起動できない", isCorrect: false },
        { text: "importの可否はフォルダ名ではなく拡張子だけで決まる", isCorrect: false }
      ],
      explanation: "GHCはimportする側のファイルの場所を見ない。モジュール名のドットを/に置き換えたパスを、検索パス(既定は起動時のカレントディレクトリ、-iで追加可能)の各ディレクトリ直下から機械的に探すだけ。そのためルートでghciを起動して離れた場所のMain.hsを:lで読み込むと、同じ相対位置にあるはずのモジュールが見つからずエラーになることがある。"
    },
    {
      id: "20260724-q6",
      question: "もしMain.hsで qualified の代わりに <code>import Geometry.Sphere</code> と <code>import Geometry.Cuboid</code> を修飾なしで両方書き、コード中で <code>area 3</code> を呼び出すとどうなるか?",
      code: `<span class="keyword">import</span> Geometry.Sphere
<span class="keyword">import</span> Geometry.Cuboid

main = putStrLn $ show (area 3)`,
      choices: [
        { text: "問題なくコンパイルできる。Haskellは引数の型からどちらのareaか自動的に推論する", isCorrect: false },
        { text: "後からimportしたモジュールのareaが常に優先されて使われる", isCorrect: false },
        { text: "areaという同名の関数がSphereとCuboidの両方からエクスポートされているため、呼び出しが曖昧になりコンパイルエラーになる", isCorrect: true },
        { text: "先にimportしたモジュールのareaが常に優先されて使われる", isCorrect: false }
      ],
      explanation: "Haskellは型クラスのようなオーバーロード解決を素の関数名には行わない。同名の関数が複数モジュールからスコープに入ると、呼び出し時点で曖昧な識別子としてコンパイルエラーになる。"
    }
  ]
};
