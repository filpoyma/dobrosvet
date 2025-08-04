import { useState, useEffect } from "react";
import svetVilleIcon from "./assets/svetville.svg";
import { openaiApi } from "./api/openaiApi";
import api from "./api/baseApi";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("Ты — креативный копирайтер. Придумай короткий, цепляющий заголовок и интересное описание для изображения, сгенерированного по промпту: $prompt. Не упоминай, что это ИИ или Clipdrop. Описание — 1-2 предложения. Не добавляй никаких эмодзи");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [pinterestLoading, setPinterestLoading] = useState(false);
  const [pinterestSuccess, setPinterestSuccess] = useState("");
  const [pinterestError, setPinterestError] = useState("");

  // Загрузка последних данных при монтировании
  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await api.get("discord/latest").json() as {
          success: boolean;
          data?: {
            imageUrl: string;
            prompt: string;
          };
        };
        if (res?.success && res.data) {
          setImageUrl(res.data.imageUrl || "");
          setPrompt(res.data.prompt || "");
        }
      } catch (e) {
        // Не показываем ошибку пользователю, просто логируем
        console.error("Ошибка загрузки последних данных:", e);
      }
    }
    fetchLatest();
  }, []);

  // Обработчик ошибки загрузки изображения
  const handleImageError = () => {
    setImageLoading(false);
    setImageError("Ошибка загрузки изображения");
  };

  const handleGenerateDescription = async () => {
    if (!imageUrl.trim()) {
      setError("Введите URL изображения");
      return;
    }

    if (!prompt.trim()) {
      setError("Введите промпт для генерации описания");
      return;
    }

    setLoading(true);
    setError("");
    setTitle("");
    setDescription("");

    try {
      // Подставляем промпт в системный промпт
      const finalSystemPrompt = systemPrompt.replace(/\$prompt/g, prompt.trim());
      
      const response = await openaiApi.generateTitleAndDescription({
        imageUrl: imageUrl.trim(),
        prompt: finalSystemPrompt,
      });
      setTitle(response.title);
      setDescription(response.description);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Ошибка при генерации описания";
      console.log("file-App.tsx err:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSendToPinterest = async () => {
    setPinterestLoading(true);
    setPinterestSuccess("");
    setPinterestError("");
    try {
      await api.post("pinterest/pin", {
        json: {
          imageUrl: imageUrl.trim(),
          title: title.trim(),
          description: description.trim(),
        },
      }).json();
      setPinterestSuccess("Пин успешно опубликован!");
    } catch (e: unknown) {
      setPinterestError(e instanceof Error ? e.message : "Ошибка публикации в Pinterest");
    } finally {
      setPinterestLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://svetville.ru/" target="_blank">
          <img src={svetVilleIcon} className="logo" alt="SvetVille logo" />
        </a>
      </div>

      <h2>Image Description Generator</h2>

      <div className="card">
        <div className="input-section">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Введите URL изображения..."
            className="url-input"
            disabled={loading}
          />

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Введите промпт для генерации описания..."
            rows={4}
            className="prompt-input"
            disabled={loading}
          />

          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Системный промпт для OpenAI..."
            rows={6}
            className="system-prompt-input"
            disabled={loading}
          />

          <div className="button-group">
            <button
              onClick={handleGenerateDescription}
              disabled={loading || !imageUrl.trim() || !prompt.trim()}
              className="generate-button"
            >
              {loading ? "Генерируем..." : "Генерировать описание"}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Генерация описания может занять несколько минут...</p>
          </div>
        )}

        {(title || description || imageUrl) && (
          <div className="result-section">
       
            {imageUrl && (
              <div className="image-preview">
                {imageLoading && (
                  <div className="image-loading">
                    <div className="spinner"></div>
                    <p>Загрузка изображения...</p>
                  </div>
                )}
                {imageError && (
                  <div className="image-error">
                    <p>{imageError}</p>
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt="Изображение для анализа"
                  className="preview-image"        
                  onError={handleImageError}
                  style={{ display: imageLoading ? 'none' : 'block' }}
                />
              </div>
            )}
            <div className="description-section">
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="title-edit-input"
                placeholder="Заголовок"
                disabled={loading}
              />
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="description-edit-input"
                placeholder="Описание"
                rows={3}
                disabled={loading}
              />
              <button
                className="pinterest-button"
                onClick={handleSendToPinterest}
                disabled={pinterestLoading || !title.trim() || !description.trim() || !imageUrl.trim()}
              >
                {pinterestLoading ? "Публикация..." : "Опубликовать в Pinterest"}
              </button>
              {pinterestSuccess && <div className="success-message">{pinterestSuccess}</div>}
              {pinterestError && <div className="error-message">{pinterestError}</div>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
