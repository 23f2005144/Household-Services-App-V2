class Config():
    DEBUG=False
    SQLALCHEMY_TRACK_MODIFICATIONS=False

class LocalDevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI="sqlite:///household_serv_database_testing.sqlite3"
    DEBUG=True
    SECURITY_PASSWORD_HASH='bcrypt'
    SECURITY_PASSWORD_SALT='secretsaltforhashing'
    SECRET_KEY='secretkeyveryhidden'
    SECURITY_TOKEN_AUTHENTICATION_HEADER='Authentication-Token'
    SECURITY_TOKEN_MAX_AGE=3600

    CACHE_TYPE="RedisCache"
    CACHE_DEFAULT_TIMEOUT=30
    CACHE_REDIS_PORT=6379
    WTF_CSRF_ENABLED=False