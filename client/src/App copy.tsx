import { useState } from "react";
import svetVilleIcon from "./assets/svetville.svg";
import { clipdropApi } from "./api/clipdropApi";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError("Введите промпт для генерации изображения");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");
    setTitle("");
    setDescription("");

    try {
      const response = await clipdropApi.generateImage({
        prompt: prompt.trim(),
      });
      setImageUrl(response.imageUrl);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Ошибка при генерации изображения";
      console.log("file-App.tsx err:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImageWithDescription = async () => {
    if (!prompt.trim()) {
      setError("Введите промпт для генерации изображения");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");
    setTitle("");
    setDescription("");

    try {
      const response = await clipdropApi.generateImageWithDescription({
        prompt: prompt.trim(),
      });
      setImageUrl(response.imageUrl);
      setTitle(response.title);
      setDescription(response.description);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Ошибка при генерации изображения с описанием";
      console.log("file-App.tsx err:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://svetville.ru/" target="_blank">
          <img src={svetVilleIcon} className="logo" alt="SvetVille logo" />
        </a>
      </div>

      <h2>Image Generation Service</h2>

      <div className="card">
        <div className="input-section">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите изображение, которое хотите сгенерировать..."
            rows={4}
            className="prompt-input"
            disabled={loading}
          />

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите изображение, которое хотите сгенерировать..."
            rows={4}
            className="prompt-input"
            disabled={loading}
          />

          <div className="button-group">
            <button
              onClick={handleGenerateImage}
              disabled={loading || !prompt.trim()}
              className="generate-button"
            >
              {loading ? "Генерируем..." : "Сгенерировать изображение"}
            </button>
            
            <button
              onClick={handleGenerateImageWithDescription}
              disabled={loading || !prompt.trim()}
              className="generate-button generate-with-description"
            >
              {loading ? "Генерируем..." : "Сгенерировать с описанием"}
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Генерация изображения может занять несколько минут...</p>
          </div>
        )}

        {imageUrl && (
          <div className="image-result">
            <h3>Результат:</h3>
            <img
              src={imageUrl}
              alt="Сгенерированное изображение"
              className="generated-image"
            />
            {(title || description) && (
              <div className="description-section">
                {title && <h4 className="image-title">{title}</h4>}
                {description && <p className="image-description">{description}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
