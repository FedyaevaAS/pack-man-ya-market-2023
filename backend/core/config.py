from pydantic import BaseSettings


class Settings(BaseSettings):
    """Настройки проекта."""

    database_url: str = ''

    class Config:
        env_file = '.env'


settings = Settings()
